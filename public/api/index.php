<?php
/**
 * BuildZone Lightweight REST API for Hostinger / Apache Server
 * Handles persistent Leads CRM and website data storage.
 */

// Enable error logging, disable direct error display in JSON output
error_reporting(E_ALL);
ini_set('display_errors', 0);

// CORS and Response Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$dataDir = __DIR__ . '/data';
if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}

// Parse Endpoint and ID from URI
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
// Remove script base path e.g. /api/ or /buildzone/api/
$path = preg_replace('#^.*?/api/?#i', '', $requestUri);
$segments = array_values(array_filter(explode('/', trim($path, '/'))));

$resource = $segments[0] ?? ($_GET['resource'] ?? 'leads');
$id = $segments[1] ?? ($_GET['id'] ?? null);
$method = $_SERVER['REQUEST_METHOD'];

// Helper Functions
function getJsonFile($resource) {
    global $dataDir;
    $safeName = preg_replace('/[^a-zA-Z0-9_-]/', '', $resource);
    return $dataDir . '/' . $safeName . '.json';
}

function loadData($resource) {
    $file = getJsonFile($resource);
    if (file_exists($file)) {
        $content = file_get_contents($file);
        $json = json_decode($content, true);
        if ($json !== null) {
            return $json;
        }
    }
    return getSeedData($resource);
}

function saveData($resource, $data) {
    $file = getJsonFile($resource);
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

function sendResponse($data, $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function sendLeadEmailNotification($lead) {
    $to = "contact@buildzone.tech"; // Default notification inbox
    $subject = "🔥 New Inbound Lead: " . ($lead['name'] ?? 'Website Inquiry') . " (" . ($lead['service'] ?? 'General') . ")";
    
    $name = htmlspecialchars($lead['name'] ?? 'N/A');
    $email = htmlspecialchars($lead['email'] ?? 'N/A');
    $phone = htmlspecialchars($lead['phone'] ?? 'N/A');
    $company = htmlspecialchars($lead['company'] ?? 'N/A');
    $service = htmlspecialchars($lead['service'] ?? 'N/A');
    $budget = htmlspecialchars($lead['budget'] ?? 'N/A');
    $timeline = htmlspecialchars($lead['timeline'] ?? 'N/A');
    $source = htmlspecialchars($lead['source'] ?? 'Website');
    $details = nl2br(htmlspecialchars($lead['projectDetails'] ?? ($lead['message'] ?? 'None')));

    $message = "
    <html>
    <head><title>New Lead Inquiry - BuildZone</title></head>
    <body style='font-family: Arial, sans-serif; background-color: #f4f6f9; padding: 20px;'>
      <div style='max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; overflow: hidden;'>
        <div style='background: #0B1938; padding: 20px; text-align: center; color: #ffffff;'>
          <h2 style='margin: 0; font-size: 20px;'>BuildZone Lead Notification</h2>
          <p style='margin: 5px 0 0; color: #00F0FF; font-size: 12px; font-weight: bold;'>NEW CLIENT INQUIRY RECEIVED</p>
        </div>
        <div style='padding: 24px;'>
          <table style='width: 100%; border-collapse: collapse; font-size: 14px;'>
            <tr><td style='padding: 8px 0; color: #64748b; width: 140px;'><strong>Full Name:</strong></td><td style='padding: 8px 0; color: #0B1938;'><strong>{$name}</strong></td></tr>
            <tr><td style='padding: 8px 0; color: #64748b;'><strong>Email:</strong></td><td style='padding: 8px 0;'><a href='mailto:{$email}' style='color: #0066FF;'>{$email}</a></td></tr>
            <tr><td style='padding: 8px 0; color: #64748b;'><strong>Phone:</strong></td><td style='padding: 8px 0; color: #0B1938;'>{$phone}</td></tr>
            <tr><td style='padding: 8px 0; color: #64748b;'><strong>Company:</strong></td><td style='padding: 8px 0; color: #0B1938;'>{$company}</td></tr>
            <tr><td style='padding: 8px 0; color: #64748b;'><strong>Service:</strong></td><td style='padding: 8px 0; color: #0066FF; font-weight: bold;'>{$service}</td></tr>
            <tr><td style='padding: 8px 0; color: #64748b;'><strong>Budget:</strong></td><td style='padding: 8px 0; color: #0B1938;'>{$budget}</td></tr>
            <tr><td style='padding: 8px 0; color: #64748b;'><strong>Timeline:</strong></td><td style='padding: 8px 0; color: #0B1938;'>{$timeline}</td></tr>
            <tr><td style='padding: 8px 0; color: #64748b;'><strong>Source:</strong></td><td style='padding: 8px 0; color: #64748b;'>{$source}</td></tr>
          </table>
          <div style='margin-top: 20px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px;'>
            <strong style='color: #0B1938; display: block; margin-bottom: 8px;'>Project Overview & Details:</strong>
            <p style='margin: 0; color: #334155; line-height: 1.5;'>{$details}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
    ";

    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: BuildZone Website <noreply@" . ($_SERVER['SERVER_NAME'] ?? 'buildzonetechnology.com') . ">\r\n";
    if (!empty($lead['email']) && filter_var($lead['email'], FILTER_VALIDATE_EMAIL)) {
        $headers .= "Reply-To: {$lead['email']}\r\n";
    }

    @mail($to, $subject, $message, $headers);
}

// Initial Seed Data for fallback
function getSeedData($resource) {
    if ($resource === 'leads') {
        return [
            [
                "id" => "lead-101",
                "name" => "Alexander Wright",
                "company" => "Nexus Logistics Corp",
                "email" => "a.wright@nexuslogistics.io",
                "phone" => "+1 (415) 892-3104",
                "country" => "United States",
                "service" => "AI Development",
                "budget" => "$25,000+",
                "timeline" => "1–3 Months",
                "projectDetails" => "Need a custom AI demand forecasting platform with automated purchase order dispatch and ERP webhook integration for 30 warehouses.",
                "source" => "Start a Project Wizard",
                "assignedTo" => "Alex Thorne",
                "status" => "Negotiation",
                "createdDate" => "2026-08-28T14:30:00Z",
                "activities" => [
                    [ "id" => "act-1", "type" => "Lead Created", "note" => "Lead submitted via multi-step wizard", "timestamp" => "2026-08-28T14:30:00Z" ]
                ]
            ],
            [
                "id" => "lead-102",
                "name" => "Sophie Tremblay",
                "company" => "Clinique Health Systems",
                "email" => "sophie@cliniquenet.ca",
                "phone" => "+1 (514) 778-9012",
                "country" => "Canada",
                "service" => "Web Development",
                "budget" => "$10,000–$25,000",
                "timeline" => "3–6 Months",
                "projectDetails" => "Rebuilding our patient appointment and doctor consultation portal with HIPAA compliance and bilingual French/English support.",
                "source" => "Contact Page",
                "assignedTo" => "Marcus Sterling",
                "status" => "Proposal Sent",
                "createdDate" => "2026-08-29T10:15:00Z",
                "activities" => [
                    [ "id" => "act-1", "type" => "Lead Created", "note" => "Contact form inquiry received", "timestamp" => "2026-08-29T10:15:00Z" ]
                ]
            ],
            [
                "id" => "lead-103",
                "name" => "Liam O'Connor",
                "company" => "Veloce Payments Ltd",
                "email" => "liam@velocepay.co.uk",
                "phone" => "+44 20 7946 0912",
                "country" => "United Kingdom",
                "service" => "Custom Software",
                "budget" => "$25,000+",
                "timeline" => "ASAP",
                "projectDetails" => "High-security corporate ledger and settlement engine with multi-currency banking rails and automated compliance reporting.",
                "source" => "Referral / Direct",
                "assignedTo" => "Alex Thorne",
                "status" => "Won",
                "createdDate" => "2026-08-20T09:00:00Z",
                "activities" => [
                    [ "id" => "act-1", "type" => "Lead Created", "note" => "Inbound client referral", "timestamp" => "2026-08-20T09:00:00Z" ]
                ]
            ]
        ];
    }
    return [];
}

// Get raw JSON body
$rawInput = file_get_contents('php://input');
$body = json_decode($rawInput, true) ?? $_POST;

// Route handlers
switch ($method) {
    case 'GET':
        $items = loadData($resource);
        if ($id) {
            foreach ($items as $item) {
                if (($item['id'] ?? null) == $id || ($item['slug'] ?? null) == $id) {
                    sendResponse($item);
                }
            }
            sendResponse(["error" => "Item not found"], 404);
        }
        sendResponse($items);
        break;

    case 'POST':
        $items = loadData($resource);
        if (!is_array($items)) {
            $items = [];
        }

        // Special handling for application sub-resource
        if ($resource === 'careers' && $id === 'apply') {
            $resource = 'career_applications';
            $items = loadData($resource);
        }

        $newItem = $body;
        if (empty($newItem['id'])) {
            $newItem['id'] = rtrim($resource, 's') . '-' . round(microtime(true) * 1000);
        }

        if ($resource === 'leads') {
            $newItem['status'] = $newItem['status'] ?? 'New';
            $newItem['createdDate'] = gmdate('Y-m-d\TH:i:s\Z');
            $newItem['activities'] = [
                [
                    "id" => "act-" . round(microtime(true) * 1000),
                    "type" => "Lead Created",
                    "note" => "Inquiry submitted via " . ($newItem['source'] ?? 'Website Form'),
                    "timestamp" => gmdate('Y-m-d\TH:i:s\Z')
                ]
            ];
            // Send email alert to admin
            @sendLeadEmailNotification($newItem);
        }

        array_unshift($items, $newItem);
        saveData($resource, $items);
        sendResponse($newItem, 201);
        break;

    case 'PUT':
    case 'PATCH':
        $items = loadData($resource);
        $targetId = $id ?? ($body['id'] ?? null);
        $updated = null;

        if (!$targetId) {
            sendResponse(["error" => "Missing ID for update"], 400);
        }

        foreach ($items as &$item) {
            if (($item['id'] ?? null) == $targetId) {
                if ($resource === 'leads') {
                    $acts = $item['activities'] ?? [];
                    if (!empty($body['status']) && $body['status'] !== ($item['status'] ?? '')) {
                        array_unshift($acts, [
                            "id" => "act-" . round(microtime(true) * 1000),
                            "type" => "Status Changed",
                            "note" => "Status updated from " . ($item['status'] ?? 'New') . " to " . $body['status'],
                            "timestamp" => gmdate('Y-m-d\TH:i:s\Z')
                        ]);
                    }
                    if (!empty($body['newActivity'])) {
                        array_unshift($acts, [
                            "id" => "act-" . round(microtime(true) * 1000),
                            "type" => $body['newActivity']['type'] ?? 'Note Added',
                            "note" => $body['newActivity']['note'] ?? '',
                            "timestamp" => gmdate('Y-m-d\TH:i:s\Z')
                        ]);
                    }
                    $body['activities'] = $acts;
                }
                $item = array_merge($item, $body);
                $updated = $item;
                break;
            }
        }

        if ($updated) {
            saveData($resource, $items);
            sendResponse($updated);
        }
        sendResponse(["error" => "Item not found"], 404);
        break;

    case 'DELETE':
        $items = loadData($resource);
        $targetId = $id ?? ($body['id'] ?? null);
        
        if (!$targetId) {
            sendResponse(["error" => "Missing ID for deletion"], 400);
        }

        $filtered = array_values(array_filter($items, function($item) use ($targetId) {
            return ($item['id'] ?? null) != $targetId;
        }));

        saveData($resource, $filtered);
        sendResponse(["success" => true, "id" => $targetId]);
        break;

    default:
        sendResponse(["error" => "Method not allowed"], 405);
        break;
}
