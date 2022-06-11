addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {
	return new Response(request.headers.get("cf-ray");, {
        headers: {
            "content-type": "text/plain;charset=utf-8"
        }
    });
}