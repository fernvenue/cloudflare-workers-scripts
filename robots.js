const block = `user-agent: *
disallow: /`;

const allow = `user-agent: *
allow: /`;

const allowlist = ["allow1.example.com", "allow2.example.com"];

async function handleRequest(request) {
  const requestURL = new URL(request.url);
  const hostname = requestURL.hostname;
  if (allowlist.includes(hostname) === true) {
    return new Response(allow, {
      headers: {
        'content-type': 'text/plain;charset=UTF-8',
      },
    });
  } return new Response(block, {
    headers: {
      'content-type': 'text/plain;charset=UTF-8',
    },
  });
}

addEventListener('fetch', event => {
  return event.respondWith(handleRequest(event.request));
});
