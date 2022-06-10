addEventListener('fetch', function(event) {
	event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {
	const requestURL = new URL(request.url);
	const requestMethod = request.method;
	const requestSearchParams = requestURL.searchParams;
	const remoteUpstream = "https://1.1.1.1/dns-query";
	if (requestMethod === "GET") {
		return await fetch(remoteUpstream + "?dns=" + requestSearchParams.get("dns"), { method: "GET", headers: {"accept": "application/dns-message"} });
	} else if (requestMethod === "POST") {
		return await fetch(remoteUpstream, { method: "GET", headers: {"accept": "application/dns-message"} });
	} else {
		return new Response('{"code":405,"message":"Invalid DoH Method."}', { headers: { "content-type": "application/json;charset=utf-8" }, status: 405 });
	}
}