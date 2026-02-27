import { NextRequest, NextResponse } from 'next/server';
import { notifyGoogleIndexing } from '@/lib/google-indexing';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { slug, secret, action } = body;

        // 1. Basic Security Check
        const webhookSecret = process.env.INDEXING_WEBHOOK_SECRET;
        if (!webhookSecret || secret !== webhookSecret) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (!slug) {
            return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
        }

        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thebharatmirror.com';
        const postUrl = `${siteUrl.replace(/\/$/, '')}/${slug}`;
        const indexingType = action === 'deleted' ? 'URL_DELETED' : 'URL_UPDATED';

        console.log(`[Indexing Webhook] Received ${action} for ${postUrl}`);

        // 2. Notify Google (Parallel)
        const googlePromise = notifyGoogleIndexing(postUrl, indexingType);

        // 3. Post to LinkedIn if it's a new/updated post (not for deletes)
        if (action !== 'deleted') {
            // We'll use the indexing route's ability to accept title/excerpt from the trigger if available
            // or just use generic info for now.
            const { post_title, post_excerpt } = body;
            const { postToLinkedIn } = await import('@/lib/linkedin');
            await postToLinkedIn(
                post_title || 'New Update',
                post_excerpt || 'Read the latest from The Bharat Mirror.',
                slug
            );
        }

        const result = await googlePromise;

        if (result.success) {
            return NextResponse.json({
                message: `Google notified successfully for ${indexingType}`,
                url: postUrl,
                response: result.data
            });
        } else {
            return NextResponse.json({
                error: 'Failed to notify Google',
                details: result.error
            }, { status: 500 });
        }
    } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Internal Server Error';
        console.error('[Indexing Webhook] Crash:', errorMessage);
        return NextResponse.json({ error: 'Internal Server Error', message: errorMessage }, { status: 500 });
    }
}

// Support GET for testing (if secret is provided in query params)
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const secret = searchParams.get('secret');
    const action = searchParams.get('action') || 'updated';

    const webhookSecret = process.env.INDEXING_WEBHOOK_SECRET;
    if (!webhookSecret || secret !== webhookSecret) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!slug) {
        return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thebharatmirror.com';
    const postUrl = `${siteUrl.replace(/\/$/, '')}/${slug}`;
    const indexingType = action === 'deleted' ? 'URL_DELETED' : 'URL_UPDATED';

    const result = await notifyGoogleIndexing(postUrl, indexingType);

    return NextResponse.json(result);
}
