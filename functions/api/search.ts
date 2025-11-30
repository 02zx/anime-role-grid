export const onRequestPost = async (context) => {
    const { request } = context;

    try {
        // Read the body from the client
        const body = await request.json();

        // Get the client's auth header
        const authHeader = request.headers.get('Authorization');

        // Forward to Bangumi
        const response = await fetch('https://api.bgm.tv/v0/search/characters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHeader || '',
                // Use a fixed User-Agent for the proxy to ensure compliance
                'User-Agent': 'AnimeGrid/1.0 (https://github.com/ywh555hhh/anime-role-grid)',
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow CORS
            },
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
