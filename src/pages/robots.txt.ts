import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const siteUrl = new URL(import.meta.env.BASE_URL, site).href.replace(/\/$/, '');
  const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${siteUrl}/sitemap-index.xml
`;
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
