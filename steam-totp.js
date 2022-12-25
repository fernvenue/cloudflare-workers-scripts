// Thanks https://github.com/DoctorMcKay/node-steam-totp 
// and https://t.me/steam_code_bot (GitHub: @AMD-NICK)!

export default {
  async fetch(request, env) {
    return await handleRequest(request)
  }
}

async function handleRequest(request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("q") || 'cnOgv/KdpLoP6Nbh0GMkXkPXALQ=';
  const checkDiff = url.searchParams.get("check");
  let code;
  if (checkDiff) {
    const { err, diff, elapsed } = await getTimeDiff();
    if (err) {
      return new Response(err.message);
    } else {
      console.log(`diff: ${diff}s, elpased: ${elapsed}ms`);
      code = await generateAuthCode(secret, diff);
    }
  } else {
    code = await generateAuthCode(secret, 0);
  }
  return new Response(code);
}

/**
 * Returns the current local Unix time in seconds.
 * @param {number} [timeOffset=0] - This many seconds will be added to the returned time
 * @returns {number}
 */
function getTime(timeOffset) {
  return Math.floor(Date.now() / 1000) + (timeOffset || 0);
};

function base64ToArrayBuffer(base64) {
  const bs = atob(base64);
  const len = bs.length;
  const bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = bs.charCodeAt(i);
  }
  return bytes.buffer;
}

async function getTimeDiff() {
  const start = Date.now();
  const steamTimeApi = 'https://api.steampowered.com/ITwoFactorService/QueryTime/v1/';
  const localTime = getTime();
  let obj = {
    err: null,
    diff: 0,  // In seconds
    elapsed: 0,
    response: null,
  };
  await fetch(steamTimeApi, {
    method: 'POST',
    headers: {
      "Content-Length": 0,
    }
  })
    .then((res) => {
      if (res.status != 200) {
        console.log(`HTTP error ${res.status}.`)
        obj.err = new Error(`HTTP error ${res.status}.`);
        return null;
      }
      return res.json();
    })
    .then(({response: data}) => {
      if (!data || !data['server_time']) {
        obj.err = new Error("Malformed response");
      } else {
        obj.diff = data['server_time'] - localTime;
        obj.response = data;
      }
    });
  obj.elapsed = Date.now() - start;
  return obj;
};

/**
 * Generate a Steam-style TOTP authentication code.
 * @param {string} secret - Your TOTP shared_secret as base64 encoded string
 * @param {number} [timeDiff=0] - If you know how far off your clock is from the Steam servers, put the offset here in seconds
 * @returns {string}
 */
async function generateAuthCode(secret, timeDiff = 0) {

  secret = base64ToArrayBuffer(secret);

  let time = Math.floor(getTime(timeDiff) / 30);

  let buffer = new Uint8Array(new ArrayBuffer(8));
  // The first 4 bytes are the high 4 bytes of a 64-bit integer. To make things easier on ourselves, let's just pretend
  // that it's a 32-bit int and write 0 for the high bytes. Since we're dividing by 30, this won't cause a problem
  // until the year 6053.
  buffer.set([ 0, 0, 0, 0, time >>> 24, time >>> 16, time >>> 8, time ]);

  const hmac = await crypto.subtle.importKey(
    'raw',
    secret,
    {name: 'HMAC', hash: 'SHA-1'},
    false,
    ['sign']
  );

  const hmacValue = await crypto.subtle.sign('HMAC', hmac, buffer);
  const hmacArray = new Uint8Array(hmacValue);

  let offset = hmacArray[hmacArray.length - 1] & 0x0F;
  
  let u32BE = 0;
  for (let i = 0; i < 4; i++) {
    u32BE <<= 8;
    u32BE |= hmacArray[offset + i];
  }

  let fullcode = u32BE & 0x7FFFFFFF;

  const chars = '23456789BCDFGHJKMNPQRTVWXY';

  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(fullcode % chars.length);
    fullcode /= chars.length;
  }

  return code;
};
