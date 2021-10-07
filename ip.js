async function handleRequest(request) {
  return new Response(request.headers.get('cf-connecting-ip'), {
    headers: {
      "content-type": "text/plain;charset=UTF-8",
    },
  })
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event.request))
})
