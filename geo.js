addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  let content = "{" + '\n'

  content += '    ' + '"ASN": "' + request.cf.asn + '",\n'
  content += '    ' + '"Organization": "' + request.cf.asOrganization + '",\n'
  content += '    ' + '"Colo": "' + request.cf.colo + '",\n'
  content += '    ' + '"Country": "' + request.cf.country + '",\n'
  content += '    ' + '"City": "' + request.cf.city + '",\n'
  content += '    ' + '"Continent": "' + request.cf.continent + '",\n'
  content += '    ' + '"Latitude": "' + request.cf.latitude + '",\n'
  content += '    ' + '"Longitude": "' + request.cf.longitude + '",\n'
  content += '    ' + '"PostalCode": "' + request.cf.postalCode + '",\n'
  content += '    ' + '"MetroCode": "' + request.cf.metroCode + '",\n'
  content += '    ' + '"Region": "' + request.cf.region + '",\n'
  content += '    ' + '"RegionCode": "' + request.cf.regionCode + '",\n'
  content += '    ' + '"Timezone": "' + request.cf.timezone + '",\n'
  content += '    ' + '"Protocol": "' + request.cf.httpProtocol + '",\n'
  content += '    ' + '"tlsCipher": "' + request.cf.tlsCipher + '",\n'
  content += '    ' + '"tlsVersion": "' + request.cf.tlsVersion + '",\n'
  content += '    ' + '"Method": "' + request.method + '",\n'
  content += '    ' + '"Host": "' + request.headers.get('host') + '",\n'
  content += '    ' + '"IP": "' + request.headers.get('cf-connecting-ip') + '",\n'
  content += '    ' + '"UA": "' + request.headers.get('user-agent') + '",\n'
  content += '    ' + '"Language": "' + request.headers.get('accept-language') + '"\n'

  content += "}"
  return new Response(content, {
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },})
}
