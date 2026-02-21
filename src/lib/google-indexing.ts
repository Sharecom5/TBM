import { google } from 'googleapis';

const clientEmail = process.env.GOOGLE_INDEXING_CLIENT_EMAIL;
const privateKey = process.env.GOOGLE_INDEXING_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!clientEmail || !privateKey) {
    console.warn('Google Indexing API credentials missing. Automated indexing will be disabled.');
}

const auth = new google.auth.JWT(
    clientEmail,
    null,
    privateKey,
    ['https://www.googleapis.com/auth/indexing']
);

const indexing = google.indexing('v3');

type IndexingType = 'URL_UPDATED' | 'URL_DELETED';

export async function notifyGoogleIndexing(url: string, type: IndexingType = 'URL_UPDATED') {
    if (!clientEmail || !privateKey) {
        return { success: false, error: 'Credentials missing' };
    }

    try {
        const response = await indexing.urlNotifications.publish({
            auth,
            requestBody: {
                url,
                type,
            },
        });

        console.log(`[Google Indexing] Notified ${type} for ${url}:`, response.data);
        return { success: true, data: response.data };
    } catch (error: any) {
        console.error(`[Google Indexing] Error notifying ${type} for ${url}:`, error.response?.data || error.message);
        return { success: false, error: error.response?.data || error.message };
    }
}
