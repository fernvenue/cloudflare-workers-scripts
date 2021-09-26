const redirectMap = new Map([
  ["/",          "https://example.com"],
  ["/www",   "https://www.example.com"],
])

async function handleRequest(request) {
  const requestURL = new URL(request.url)
  const path = requestURL.pathname;
  const location = redirectMap.get(path)
  if (location) {
    return Response.redirect(location, 301)
  } return fetch(request)
}

addEventListener("fetch", async event => {
  event.respondWith(handleRequest(event.request))
})
