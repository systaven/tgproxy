export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // 强行把目的地指向 Telegram 官方
    url.host = "api.telegram.org";
    
    // 生成新的请求，原封不动带着原来的 headers 和 body
    const modifiedRequest = new Request(url.toString(), request);
    
    // 直接把 Telegram 的响应扔回去，不解压、不拦截、不修改
    return fetch(modifiedRequest);
  },
};
