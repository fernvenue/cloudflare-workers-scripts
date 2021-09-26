const redirectMap = new Map([
  ["www.example.com",   "https://example.com"],
  ["m.example.com",     "https://example.com"],
])

async function handleRequest(request) {
  const requestURL = new URL(request.url)
  const host = requestURL.hostname;
  const hostname = redirectMap.get(host)
  if (hostname) {
    return Response.redirect(hostname, 301)
  } return fetch(request)
}

addEventListener("fetch", async event => {
  event.respondWith(handleRequest(event.request))
})
