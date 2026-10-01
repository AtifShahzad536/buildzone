import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { siteConfig } from '../../config/siteConfig';

export const SEOHead = ({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  schema,
}) => {
  const settings = useSelector((state) => state.settings);
  const companyName = settings?.companyName || siteConfig.name;
  
  const fullTitle = title 
    ? (title.includes(companyName) ? title : `${title} | ${companyName}`)
    : `${companyName} | Best Software Agency in Sialkot`;
    
  const metaDesc = description || settings?.metaDescription || siteConfig.description;
  const metaKeywords = keywords || "Best Software House in Sialkot, No 1 Software House in Sialkot, Top Software House in Sialkot, Software House in Sialkot, Best Software Agency in Sialkot, Top Software Agency Sialkot, Best IT Company in Sialkot, Custom Software Development Sialkot, Web Development Sialkot, Mobile App Development Sialkot, AI Solutions Sialkot, ERP Systems Sialkot Pakistan";

  useEffect(() => {
    document.title = fullTitle;

    let metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (!metaDescriptionTag) {
      metaDescriptionTag = document.createElement('meta');
      metaDescriptionTag.name = 'description';
      document.head.appendChild(metaDescriptionTag);
    }
    metaDescriptionTag.setAttribute('content', metaDesc);

    let metaKeywordsTag = document.querySelector('meta[name="keywords"]');
    if (!metaKeywordsTag) {
      metaKeywordsTag = document.createElement('meta');
      metaKeywordsTag.name = 'keywords';
      document.head.appendChild(metaKeywordsTag);
    }
    metaKeywordsTag.setAttribute('content', metaKeywords);


    // Open Graph
    let ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (!ogTitleTag) {
      ogTitleTag = document.createElement('meta');
      ogTitleTag.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitleTag);
    }
    ogTitleTag.setAttribute('content', fullTitle);

    // Canonical link
    const currentPath = typeof window !== 'undefined' ? window.location.pathname.replace(/\/+$/, '') : '';
    const resolvedCanonical = canonical || (currentPath ? `https://buildzonetechnology.com${currentPath}` : 'https://buildzonetechnology.com/');
    
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', resolvedCanonical);

    // JSON-LD structured schema
    if (schema) {
      let scriptTag = document.getElementById('json-ld-schema');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'json-ld-schema';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.text = JSON.stringify(schema);
    }
  }, [fullTitle, metaDesc, canonical, schema]);

  return null;
};

export default SEOHead;
