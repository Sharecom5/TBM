const fs = require('fs');
const path = require('path');

async function generateNewsSitemap() {
    console.log('[Sitemap] Starting generation...');
    const siteUrl = 'https://thebharatmirror.com';
    const wpUrl = 'https://admin.thebharatmirror.com/wp-json/wp/v2/posts';

    // 48 hours ago
    const after = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();

    try {
        let response = await fetch(`${wpUrl}?_embed=true&per_page=100&after=${after}`);
        let posts = await response.json();

        // Fallback to latest 10 posts if 48h search is empty
        if (!Array.isArray(posts) || posts.length === 0) {
            console.log('[Sitemap] No posts in 48h, falling back to latest 10');
            response = await fetch(`${wpUrl}?_embed=true&per_page=10`);
            posts = await response.json();
        }

        if (!Array.isArray(posts)) {
            console.error('[Sitemap] Failed to fetch posts');
            return;
        }

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${posts.map(post => {
            const title = (post.title.rendered || '')
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&apos;');

            const pubDate = new Date(post.date).toISOString();
            return `
  <url>
    <loc>${siteUrl}/${post.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>The Bharat Mirror</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>
  </url>`;
        }).join('')}
</urlset>`;

        const publicPath = path.join(process.cwd(), 'public', 'news-sitemap.xml');
        fs.writeFileSync(publicPath, xml);
        console.log(`[Sitemap] Successfully generated at ${publicPath}`);
    } catch (err) {
        console.error('[Sitemap] Critical Error:', err.message);
    }
}

generateNewsSitemap();
