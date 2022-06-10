const blockRule = `user-agent: *\ndisallow: /`;
const allowRule = `user-agent: *\nallow: /`;
const allowSites = ["allow1.example.com", "allow2.example.com"];

async function handleRequest(request) {
  const requestURL = new URL(request.url);
  const requestHostname = requestURL.hostname;
  if (allowSites.includes(requestHostname) === true) {
    return new Response(allowRule, { headers: { "content-type": "text/plain;charset=utf-8" }});
  };
  return new Response(blockRule, { headers: { "content-type": "text/plain;charset=utf-8" }});
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request));
});
