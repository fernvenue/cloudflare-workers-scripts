addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
})

async function handleRequest(request) {
	let responseContent = "{";
	responseContent += '"ASN":"' + request.cf.asn + '",';
	responseContent += '"ASO":"' + request.cf.asOrganization + '",';
	responseContent += '"City":"' + request.cf.city + '",';
	responseContent += '"Country":"' + request.cf.country + '",';
	// For more value: https://developers.cloudflare.com/workers/runtime-apis/request/#incomingrequestcfproperties
	responseContent += '"UA":"' + request.headers.get("user-agent") + '"}';
	return new Response(responseContent, { headers: { "content-type": "application/json;charset=utf-8" }});
}