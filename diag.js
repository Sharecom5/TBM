
async function test() {
    try {
        const url = 'https://admin.thebharatmirror.com/wp-json/wp/v2/posts?per_page=1';
        const res = await fetch(url);
        console.log('--- DIAG RESULTS ---');
        console.log('URL:', url);
        console.log('STATUS:', res.status);
        console.log('SERVER:', res.headers.get('server'));
        console.log('VERCEL-ID:', res.headers.get('x-vercel-id'));
        console.log('CACHE-CONTROL:', res.headers.get('cache-control'));
        console.log('--- END DIAG ---');
    } catch (e) {
        console.log('ERR:', e.message);
    }
}
test();
