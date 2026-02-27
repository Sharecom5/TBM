
const { getRecentPostsForSitemap } = require('./src/lib/wordpress');

async function test() {
    process.env.WORDPRESS_API_URL = 'https://wp.thebharatmirror.com/wp-json';
    console.log('Fetching recent posts for sitemap...');
    try {
        const posts = await getRecentPostsForSitemap();
        console.log('Posts found:', posts.length);
        if (posts.length > 0) {
            console.log('First post:', posts[0].title, posts[0].date);
        } else {
            console.log('No posts in the last 48 hours.');
        }
    } catch (e) {
        console.error('Error:', e.message);
    }
}

test();
