import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().optional(),
  email: z.string().email("Please provide a valid business email"),
  phone: z.string().optional(),
  country: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  projectDetails: z.string().min(10, "Please provide more details about your project (min 10 characters)"),
  ndaRequired: z.boolean().optional(),
  honeypot: z.string().max(0, "Spam detected").optional(),
});

export const contactSchema = contactFormSchema;

export const startProjectWizardSchema = z.object({
  services: z.array(z.string()).min(1, "Please select at least one service").optional(),
  projectType: z.string().optional(),
  budget: z.string().min(1, "Please select your estimated budget"),
  timeline: z.string().min(1, "Please select your target timeline"),
  projectDetails: z.string().min(10, "Please describe your project scope and objectives"),
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid work email is required"),
  company: z.string().optional(),
  phone: z.string().optional(),
  country: z.string().optional(),
});

export const wizardSchema = startProjectWizardSchema;

export const jobApplicationSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("Valid email address is required"),
  phone: z.string().min(6, "Valid phone number is required"),
  portfolio: z.string().url("Please provide a valid URL").or(z.literal('')).optional(),
  resumeLink: z.string().url("Please provide a valid link to your Resume or LinkedIn").or(z.literal('')),
  coverLetter: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.string().optional().default('Admin'),
});
