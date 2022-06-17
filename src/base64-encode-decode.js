addEventListener('fetch', event => {
	return event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
	const requestURL = new URL(request.url);
	const requestPath = requestURL.pathname;
	const requestPathname = requestPath.toLowerCase();
	if (requestPathname.substr(0,8) === "/encode/") {
		const responseContent = btoa(requestPath.substr(8));
		return new Response(responseContent, { headers: { "content-type": "text/plain;charset=utf-8" }});
	} else if (requestPathname.substr(0,8) === "/decode/") {
		const responseContent = atob(requestPath.substr(8));
		return new Response(responseContent, { headers: { "content-type": "text/plain;charset=utf-8" }});
	} else {
		return new Response("I'm a teapot.", { status: 418 });
	}
}