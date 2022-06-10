addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
})

const redirectMap = new Map([
	["www.exaple.com",	"https://example.com"],
	["m.example.com",	"https://example.com"],
])

async function handleRequest(request) {
	const requestURL = new URL(request.url)
	const requestHostname = requestURL.hostname;
	const responseHostname = redirectMap.get(requestHostname);
	if (responseHostname) {
		return Response.redirect(responseHostname, 307);
	} return new Response("I'm a teapot.", { status: 418 });
}