addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {
	const requestTimezone = request.cf.timezone;
	const responseTime = new Date().toLocaleString("en-US", { timeZone: requestTimezone });
	return new Response(responseTime, { headers: { "content-type": "text/plain;charset=utf-8" }});
}