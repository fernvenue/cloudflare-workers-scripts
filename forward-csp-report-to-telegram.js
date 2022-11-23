/* Forward CSP (Content Security Policy) Report to Telegram via bot with Cloudflare Workers

Remember to set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in 
[Cloudflare Workers Environment Secrets](https://developers.cloudflare.com/workers/platform/environment-variables/).

Example accepted JSON format (see <https://scotthelme.co.uk/content-security-policy-an-introduction/>):

Headers:
```
Content-Type: application/json
```

Body:
```json
{
    "csp-report": {
        "document-uri": "https://scotthelme.co.uk",
        "referrer": "",
        "blocked-uri": "http://scotthelme.co.uk",
        "violated-directive": "default-src https:",
        "original-policy": "default-src https:; report-uri https://report.scotthelme.co.uk"
    }
}
```

References:

- <https://developers.cloudflare.com/workers/examples/read-post/>
- <https://developers.cloudflare.com/workers/examples/fetch-json/>
- <https://developer.mozilla.org/en-US/docs/Web/API/fetch>
- <https://core.telegram.org/bots/api#sendmessage>
*/

addEventListener('fetch', function (event) {
  event.respondWith(handleRequest(event.request));
});

function makeResponse(code, text) {
  const data = {
    "code": code,
    "message": text,
  };
  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json;charset=utf-8" },
    status: code,
  })
}

async function handleRequest(request) {
  const contentType = request.headers.get('content-type') || '';

  if (!contentType.includes('application/json')) {
    return makeResponse(400, "Report content is not a valid json.");
  }

  const reqBody = await request.json();
  const report = reqBody['csp-report'];

  if (!report) { return makeResponse(400, "Report content is not a valid json."); }

  const documentURI = report['document-uri'];
  const referrer = report['referrer'];
  const blockedURI = report['blocked-uri'];

  const msgData = {
    "parse_mode": "MarkdownV2",
    "text"
      : "*CSP Report*\n"
      + "Document URI: `" + documentURI + "`\n"
      + "Referrer: `" + referrer + "`\n"
      + "Blocked URI: `" + blockedURI + "`"
      + "",
    "chat_id": TELEGRAM_CHAT_ID,
  }

  const msgURI = 'https://api.telegram.org/bot' + TELEGRAM_BOT_TOKEN + '/sendMessage';
  
  var success = false;

  await fetch(msgURI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(msgData),
  })
    .then((response) => response.json())
    .then((data) => {
      success = data.ok;
      console.log('Success:', data);
    })
    .catch((error) => {
      success = false;
      console.error('Error:', error);
    });

  return success 
    ? makeResponse(200, "Successfully reported.")
    : makeResponse(504, "Report not received, channel maybe down.");
}
