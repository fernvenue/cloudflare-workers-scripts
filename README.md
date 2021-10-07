# Workers Scripts

[![ddns](https://img.shields.io/badge/LICENSE-BSD3%20Clause%20Liscense-yellow?style=flat-square)](./LICENSE)

[README](./README.md) | [中文說明](./README_zh.md)

**A collection of simple scripts for Cloudflare Workers.**

For more information about **Workers** please visit [Cloudflare Workers](https://workers.cloudflare.com).

## Reverse proxy for any resource

Paste the contents of [`reverse-cors.js`](https://raw.githubusercontent.com/fernvenue/cloudflare-workers/master/reverse-cors.js) into the Script on the left in the Cloudflare Workers Dashboard.

If you need to request `https://example.com/example.js` now you can also get it on `https://...workers.dev/https://example.com/example.js`. This applies to any resource on the Internet, even when you are using an **IPv6-Only** network.

## Reverse proxy for a single complete site

Paste the contents of [`reverse-site.js`](https://raw.githubusercontent.com/fernvenue/cloudflare-workers/master/reverse-site.js) into the Script on the left in the Cloudflare Workers Dashboard.

### Precautions

You must edit the following items in `page.js`:

```
const upstream = 'example.com'
const upstream_path = '/'
const upstream_mobile = 'example.com'
const blocked_region = []
const blocked_ip_address = []
const https = true
const disable_cache = false
const replace_dict = {
    '$upstream': '$custom_domain',
    '//example.com': ''
}
```

This reverse proxy cannot be used for login.

## Bulk redirect for host

Paste the contents of [`redirect-hostmap.js`](https://raw.githubusercontent.com/fernvenue/cloudflare-workers/master/redirect-hostmap.js) into the Script on the left in the Cloudflare Workers Dashboard.

You can specify the origin and target in the hostmap:

```
const redirectMap = new Map([
  ["www.example.com",   "https://example.com"],
  ["m.example.com",     "https://example.com"],
])
```

## Bulk redirect for path

Paste the contents of [`redirect-pathmap.js`](https://raw.githubusercontent.com/fernvenue/cloudflare-workers/master/redirect-pathmap.js) into the Script on the left in the Cloudflare Workers Dashboard.

You can specify the origin and target in the pathmap:

```
const redirectMap = new Map([
  ["/",          "https://example.com"],
  ["/www",   "https://www.example.com"],
])
```

## Return public IP as text/plain

Paste the contents of [`ip.js`](https://raw.githubusercontent.com/fernvenue/cloudflare-workers/master/ip.js) into the Script on the left in the Cloudflare Workers Dashboard.

Return the public IP address used by the user as `text/plain`.  Users can edit the Workers domain resolution in `hosts` file to limit IPv4 or IPv6 connections.

## Geolocation data as application/json

Paste the contents of [`geo.js`](https://raw.githubusercontent.com/fernvenue/cloudflare-workers/master/geo.js) into the Script on the left in the Cloudflare Workers Dashboard.

Locate user by Cloudflare and return back to the user as `application/json`.

- Demo: https://api.fernvenue.com

## For more information

- Workers Docs: https://developers.cloudflare.com/workers
- Workers Examples: https://developers.cloudflare.com/workers/examples
- Workers Proxy: https://github.com/fajarFWD/workersproxy
