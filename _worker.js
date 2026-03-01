export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. 自动兼容多种路径情况：删掉多余的 /api/ 或开头的斜杠
    let path = url.pathname.replace(/^\/api/, "");

    // 2. 检查路径是否包含 bot，如果没有，说明访问姿势不对
    if (!path.includes("/bot")) {
        return new Response("Invalid Path. Use /bot<token>/getMe", { status: 404 });
    }

    // 3. 构造目标 URL
    const targetUrl = `https://api.telegram.org${path}${url.search}`;

    // 4. 准备 Headers：必须删掉原始 Host，否则 Telegram 会拒收
    const newHeaders = new Headers(request.headers);
    newHeaders.delete("Host");
    newHeaders.set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0");

    try {
      const response = await fetch(new Request(targetUrl, {
        method: request.method,
        headers: newHeaders,
        body: request.body,
        redirect: 'follow'
      }));

      // 5. 返回原始响应，不做任何修改
      return response;
    } catch (e) {
      return new Response("Proxy Error: " + e.message, { status: 500 });
    }
  }
};
