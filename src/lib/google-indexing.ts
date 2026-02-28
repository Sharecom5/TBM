import { google } from 'googleapis';

const clientEmail = process.env.GOOGLE_INDEXING_CLIENT_EMAIL;
const privateKey = process.env.GOOGLE_INDEXING_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!clientEmail || !privateKey) {
    console.warn('Google Indexing API credentials missing. Automated indexing will be disabled.');
}

const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/indexing']
});

const indexing = google.indexing('v3');

type IndexingType = 'URL_UPDATED' | 'URL_DELETED';

export async function notifyGoogleIndexing(url: string, type: IndexingType = 'URL_UPDATED') {
    if (!clientEmail || !privateKey) {
        return { success: false, error: 'Credentials missing' };
    }

    // Clean URL: Remove trailing slashes (Google Indexing is very sensitive to exact matches)
    const cleanUrl = url.replace(/\/$/, '');

    try {
        const response = await indexing.urlNotifications.publish({
            auth,
            requestBody: {
                url: cleanUrl,
                type,
            },
        });

        console.log(`[Google Indexing] Notified ${type} for ${url}:`, response.data);
        return { success: true, data: response.data };
    } catch (error: unknown) {
        let errorMessage = 'Unknown error';
        if (error instanceof Error) {
            const responseData = (error as { response?: { data?: unknown } }).response?.data;
            errorMessage = typeof responseData === 'string'
                ? responseData
                : responseData
                    ? JSON.stringify(responseData)
                    : error.message;
        }
        console.error(`[Google Indexing] Error notifying ${type} for ${url}:`, errorMessage);
        return { success: false, error: errorMessage };
    }
}
