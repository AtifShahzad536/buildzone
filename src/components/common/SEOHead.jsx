import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { siteConfig } from '../../config/siteConfig';

export const SEOHead = ({
  title,
  description,
  canonical,
  ogType = 'website',
  schema,
}) => {
  const settings = useSelector((state) => state.settings);
  const companyName = settings?.companyName || siteConfig.name;
  const fullTitle = title ? `${title} | ${companyName}` : `${companyName} — Scalable Software, AI & Digital Product Engineering`;
  const metaDesc = description || settings?.metaDescription || siteConfig.description;

  useEffect(() => {
    document.title = fullTitle;

    let metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (!metaDescriptionTag) {
      metaDescriptionTag = document.createElement('meta');
      metaDescriptionTag.name = 'description';
      document.head.appendChild(metaDescriptionTag);
    }
    metaDescriptionTag.setAttribute('content', metaDesc);

    // Open Graph
    let ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (!ogTitleTag) {
      ogTitleTag = document.createElement('meta');
      ogTitleTag.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitleTag);
    }
    ogTitleTag.setAttribute('content', fullTitle);

    // Canonical link
    if (canonical) {
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', canonical);
    }

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
