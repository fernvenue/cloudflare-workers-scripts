# Cloudflare Workers Scripts

[![cloudflare-workers-scripts](https://img.shields.io/badge/LICENSE-BSD3%20Clause%20Liscense-blue?style=flat-square)](./LICENSE)
[![cloudflare-workers-scripts](https://img.shields.io/badge/GitHub-Cloudflare%20Workers%20Scripts-blueviolet?style=flat-square&logo=github)](https://github.com/fernvenue/cloudflare-workers-scripts)
[![cloudflare-workers-scripts](https://img.shields.io/badge/GitLab-Cloudflare%20Workers%20Scripts-orange?style=flat-square&logo=gitlab)](https://gitlab.com/fernvenue/cloudflare-workers-scripts)

[README](./README.md) | [中文說明](./README_zh.md)

**適用於 [Cloudflare Workers](https://workers.cloudflare.com) 的簡易腳本集合.**

## 對任意資源的反向代理

拷貝 [`reverse-cors.js`](./reverse-cors.js) 中的內容至 Cloudflare Workers 面板左側的腳本框並保存.

此時當你需要請求 `https://example.com/example.js` 時可以透過 `https://...workers.dev/https://example.com/example.js`. 這對於任意資源都有效, 即使你正在使用 IPv6-Only 的網路.

## 對單個整站的反向代理

拷貝 [`reverse-site.js`](./reverse-site.js) 中的內容至 Cloudflare Workers 面板左側的腳本框並保存.

### 注意事項

你必須首先在 `page.js` 中修改以下項:

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

這一方式的反向代理暫 **不支援** 登入.

## 針對域名的批量重新導向

拷貝 [`redirect-hostmap.js`](./redirect-hostmap.js) 中的內容至 Cloudflare Workers 面板左側的腳本框並保存.

你可以在 hostmap 中指定當前域名和目標地址的對應關系:

```
const redirectMap = new Map([
  ["www.example.com",   "https://example.com"],
  ["m.example.com",     "https://example.com"],
])
```

## 針對路徑的批量重新導向

拷貝 [`redirect-pathmap.js`](./redirect-pathmap.js) 中的內容至 Cloudflare Workers 面板左側的腳本框並保存.

你可以在 hostmap 中指定當前路徑和目標地址的對應關系:

```
const redirectMap = new Map([
  ["/",          "https://example.com"],
  ["/www",   "https://www.example.com"],
])
```

## 返回用戶公網地址

拷貝 [`ip.js`](./master/ip.js) 中的內容至 Cloudflare Workers 面板左側的腳本框並保存.

用於以 `text/plain` 格式返回用戶用於連接時的公網 IP 地址, 用戶可以在 `hosts` 中編輯 Workers 對應域的解析結果來限制連接方式為 IPv4 或 IPv6.

- 實例: https://api.fernvenue.com/ip

## 返回用戶位置信息

拷貝 [`geo.js`](./geo.js) 中的內容至 Cloudflare Workers 面板左側的腳本框並保存.

透過 Cloudflare 定位用戶信息並以 `application/json` 格式返回.

- 實例: https://api.fernvenue.com/me

## 對爬蟲規則文件統一管理

拷貝 [`robots.js`](./robots.js) 中的內容至 Cloudflare Workers 面板左側的腳本框並保存, 然後在 Cloudflare 面板中選擇對應域名, 並進入 **Workers - HTTP Routes** 中像 `*example.com/robots.txt` 這樣將所有針對 `robots.txt` 的訪問都路由到這一 Workers 從而實現對這一規範文件的統一配置和管理.

- 實例: https://api.fernvenue.com/robots.txt

## 更多訊息

- Cloudflare Workers 官方文檔: https://developers.cloudflare.com/workers
- Cloudflare Workers 官方實例: https://developers.cloudflare.com/workers/examples
- Cloudflare Workers 反向代理: https://github.com/fajarFWD/workersproxy
