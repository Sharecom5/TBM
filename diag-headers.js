async function check() {
    const url = 'https://wp.thebharatmirror.com/wp-json/wp/v2/posts?per_page=1';
    console.log('Checking:', url);
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });
        console.log('Status:', res.status);
        console.log('Headers:', JSON.stringify(Object.fromEntries(res.headers.entries()), null, 2));
        if (res.status === 401) {
            const body = await res.text();
            console.log('Body:', body);
        }
    } catch (e) {
        console.log('Error:', e.message);
    }
}
check();
