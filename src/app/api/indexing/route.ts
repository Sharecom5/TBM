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

        const result = await notifyGoogleIndexing(postUrl, indexingType);

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
    } catch (err: any) {
        console.error('[Indexing Webhook] Crash:', err.message);
        return NextResponse.json({ error: 'Internal Server Error', message: err.message }, { status: 500 });
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
