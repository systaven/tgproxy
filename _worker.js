export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    url.host = "api.telegram.org";

    // 关键点：必须克隆并修改 Headers
    const newHeaders = new Headers(request.headers);
    // 删除原始 Host，让 fetch 自动生成正确的 Host: api.telegram.org
    newHeaders.delete("Host");

    const modifiedRequest = new Request(url.toString(), {
      method: request.method,
      headers: newHeaders,
      body: request.body,
      redirect: 'follow'
    });

    try {
      const response = await fetch(modifiedRequest);
      return response;
    } catch (e) {
      return new Response("Proxy Error: " + e.message, { status: 500 });
    }
  },
};
