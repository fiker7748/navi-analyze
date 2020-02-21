function navigationTime()
{
  const performanceTiming = window.performance.timing;
  const location = window.location;
  const urlHost = location.host;
  const urlProtocol = location.protocol;
  const urlPath = location.pathname;
  const urlHash = location.hash;
  const urlHref = location.href;
  const navigationStart = performanceTiming.navigationStart;
  const dnsParse = performanceTiming.domainLookupEnd - performanceTiming.domainLookupStart;
  const isHTTP = performanceTiming.secureConnectionStart === 0;
  let tcpConnection;
  let sslHandshake;
  if (isHTTP) {
    tcpConnection = performanceTiming.connectEnd - performanceTiming.connectStart;
    sslHandshake = 0;
  } else {
    tcpConnection = performanceTiming.secureConnectionStart - performanceTiming.connectStart;
    sslHandshake = performanceTiming.connectEnd - performanceTiming.secureConnectionStart;
  }
  const serverResponse = performanceTiming.responseStart - performanceTiming.requestStart;
  const serverDownload = performanceTiming.responseEnd - performanceTiming.responseStart;
  const domLoad = performanceTiming.domComplete - performanceTiming.domLoading;
  const onLoad = performanceTiming.loadEventEnd - performanceTiming.loadEventStart;
  const pageLoad = performanceTiming.responseStart - performanceTiming.navigationStart;
  const pageLoadComplete = performanceTiming.loadEventEnd - performanceTiming.navigationStart;
  
  const apiUrl = 'http://3.114.9.249/api/navi';
  fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify({
      start: navigationStart,
      dns: dnsParse,
      tcp_connection: tcpConnection,
      ssl: sslHandshake,
      server_response: serverResponse,
      server_download: serverDownload,
      dom_load: domLoad,
      onload: onLoad,
      page_load: pageLoad,
      page_load_complete: pageLoadComplete,
      protocal: urlProtocol,
      host: urlHost,
      path: urlPath,
      hash: urlHash,
      url: urlHref,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => console.log(`Success: ${response.status}, ${response.statusText}`))
  .catch(error => console.error(`Error: ${error}`));
}
