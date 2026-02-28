
const API_URL = "https://admin.thebharatmirror.com/wp-json";

async function testFetch() {
    const url = new URL(`${API_URL}/wp/v2/posts`);
    url.searchParams.append("_embed", "true");
    url.searchParams.append("per_page", "20");
    url.searchParams.append("page", "1");

    console.log("Fetching:", url.toString());

    try {
        const res = await fetch(url.toString(), {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            },
        });

        console.log("Status:", res.status);
        const data = await res.json();
        console.log("Count:", Array.isArray(data) ? data.length : "Not an array");
        if (Array.isArray(data) && data.length > 0) {
            console.log("First item keys:", Object.keys(data[0]));
        } else {
            console.log("Data:", data);
        }
    } catch (err) {
        console.error("Error:", err.message);
    }
}

testFetch();
