
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
async function test() {
    try {
        const url = 'https://88.223.85.14/wp-json/wp/v2/posts?per_page=1';
        console.log('Testing IP Fetch with Host header...');
        const res = await fetch(url, {
            headers: {
                'Host': 'admin.thebharatmirror.com',
                'User-Agent': 'Mozilla/5.0'
            }
        });
        console.log('STATUS:', res.status);
        const body = await res.text();
        console.log('BODY:', body.slice(0, 100));
    } catch (e) {
        console.log('ERR:', e.message);
    }
}
test();
