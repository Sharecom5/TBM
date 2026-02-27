
export async function postToLinkedIn(title: string, excerpt: string, slug: string) {
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    // Support both Personal (urn:li:person) and Organization (urn:li:organization)
    const ownerUrn = process.env.LINKEDIN_ORGANIZATION_URN || process.env.LINKEDIN_PERSON_URN;

    if (!accessToken || !ownerUrn) {
        console.warn('[LinkedIn] Credentials missing. Automatic posting disabled.');
        return { success: false, error: 'Credentials missing' };
    }

    const siteUrl = 'https://thebharatmirror.com';
    const postUrl = `${siteUrl}/${slug}?utm_source=linkedin&utm_medium=social&utm_campaign=auto_post`;

    // Professional Hook Generation
    const hook = "India’s economic landscape is undergoing a critical transformation that industry leaders cannot afford to overlook.";
    const shareText = `${hook}\n\n${excerpt}\n\nRead full story here:\n${postUrl}\n\n#IndiaNews #BusinessInsights #BreakingNews #TheBharatMirror`;

    const body = {
        author: ownerUrn,
        lifecycleState: 'PUBLISHED',
        specificContent: {
            'com.linkedin.ugc.ShareContent': {
                shareCommentary: {
                    text: shareText,
                },
                shareMediaCategory: 'ARTICLE',
                media: [
                    {
                        status: 'READY',
                        description: {
                            text: excerpt,
                        },
                        originalUrl: postUrl,
                        title: {
                            text: title,
                        },
                    },
                ],
            },
        },
        visibility: {
            'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
        },
    };

    try {
        const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                'X-Restli-Protocol-Version': '2.0.0',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('[LinkedIn] Successfully posted!');
            return { success: true, data };
        } else {
            console.error('[LinkedIn] Error:', data);
            return { success: false, error: data };
        }
    } catch (err: any) {
        console.error('[LinkedIn] Fetch Error:', err.message);
        return { success: false, error: err.message };
    }
}
