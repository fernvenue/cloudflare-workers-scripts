addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
})

const redirectMap = new Map([
	["/",		"https://example.com"],
	["/www",	"https://www.example.com"],
])

async function handleRequest(request) {
	const requestURL = new URL(request.url)
	const requestPathname = requestURL.pathname;
	const responsePathname = redirectMap.get(requestPathname);
	if (responsePathname) {
		return Response.redirect(responsePathname, 307);
	} return new Response("I'm a teapot.", { status: 418 });
}