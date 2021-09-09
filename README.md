# Cloudflare Workers CORS

[![ddns](https://img.shields.io/badge/LICENSE-BSD3%20Clause%20Liscense-yellow?style=flat-square)](./LICENSE)

**Simple CORS reverse proxy on Cloudflare Workers.**

For more information about workers please visit [Cloudflare Workers](https://workers.cloudflare.com).


## For any resources

After enabled, just paste the link to the end of the address.

`https://...workers.dev/https://raw.githubusercontent.com/fernvenue/cloudflare-workers-cors/master/main.js`

Now you can access to the resources by Cloudflare Workers, even if you use the **IPv6-Only** network.

## For a single complete site

You can use `page.js` to reverse proxy a site completely and access it through Cloudflare Workers.

Can **NOT** be used to login.
