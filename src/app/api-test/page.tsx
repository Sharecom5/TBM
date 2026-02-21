import { getAllPosts } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export default async function ApiTestPage() {
    console.log("[TEST] Starting API test...");
    try {
        const posts = await getAllPosts(1, 5);
        console.log(`[TEST] Fetched ${posts?.length || 0} posts`);

        return (
            <div className="p-10">
                <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
                <p className="mb-4">Status: {posts && posts.length > 0 ? "✅ Success" : "❌ No Posts Found"}</p>
                <div className="bg-gray-100 p-4 rounded overflow-auto max-h-[500px]">
                    <pre className="text-xs">{JSON.stringify(posts, null, 2)}</pre>
                </div>
            </div>
        );
    } catch (err: unknown) {
        const error = err as Error;
        console.error("[TEST] API Test Crash:", error);
        return (
            <div className="p-10">
                <h1 className="text-2xl font-bold mb-4">API Test Page</h1>
                <p className="text-red-500 font-bold">💥 CRASHED</p>
                <pre className="mt-4">{error.message || String(error)}</pre>
            </div>
        );
    }
}
