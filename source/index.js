function json(data, status = 200) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "content-type": "application/json; charset=UTF-8",
      "cache-control": "no-store"
    }
  });
}

function text(data, status = 200, contentType = "text/plain; charset=UTF-8") {
  return new Response(data, {
    status,
    headers: {
      "content-type": contentType,
      "cache-control": "no-store"
    }
  });
}

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function getBearerToken(request) {
  const auth = request.headers.get("Authorization") || "";
  if (!auth.startsWith("Bearer ")) return "";
  return auth.slice(7).trim();
}

function randomPart(len = 4) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

function generateLicense(prefix = "SEO-") {
  return `${prefix}${randomPart(4)}${randomPart(4)}`;
}

function getHostnameFromReferer(referer) {
  if (!referer) return "";
  try {
    return new URL(referer).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function isExpired(dateStr) {
  if (!dateStr) return false;
  const now = new Date();
  const exp = new Date(dateStr + "T23:59:59Z");
  return now > exp;
}

function buildEmbed(scriptUrl) {
  return `<script src="${scriptUrl}" defer></script>`;
}

function getDefaultLogoDataUrl() {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="360" height="120" viewBox="0 0 360 120" fill="none">
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#60A5FA"/>
        <stop offset="100%" stop-color="#06B6D4"/>
      </linearGradient>
      <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#2563EB"/>
        <stop offset="100%" stop-color="#0F172A"/>
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#0F172A" flood-opacity="0.28"/>
      </filter>
    </defs>

    <g filter="url(#shadow)">
      <rect x="8" y="14" width="344" height="92" rx="22" fill="rgba(255,255,255,0.06)"/>
    </g>

    <g transform="translate(22 24)">
      <rect x="0" y="0" width="72" height="72" rx="18" fill="url(#g2)"/>
      <rect x="13" y="46" width="10" height="14" rx="3" fill="#7DD3FC"/>
      <rect x="28" y="35" width="10" height="25" rx="3" fill="#67E8F9"/>
      <rect x="43" y="23" width="10" height="37" rx="3" fill="#22D3EE"/>
      <path d="M10 50 C26 44, 38 34, 57 16" stroke="url(#g1)" stroke-width="8" stroke-linecap="round"/>
      <path d="M49 15 L59 14 L57 24" fill="url(#g1)"/>
      <circle cx="59" cy="14" r="3" fill="#E0F2FE"/>
    </g>

    <g transform="translate(108 24)">
      <text x="0" y="29" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="800" letter-spacing="1">SEO</text>
      <text x="0" y="60" fill="url(#g1)" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="800" letter-spacing="1">TRAFFIC</text>
      <text x="0" y="80" fill="#CBD5E1" font-family="Arial, Helvetica, sans-serif" font-size="10" font-weight="700" letter-spacing="2.2">SMART VISIBILITY</text>
    </g>
  </svg>`.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function buildClientScript(config) {
  const logo = config.logo || getDefaultLogoDataUrl();
  const waitTime = Number(config.seconds || 90);

  return `
(function () {
  if (window.__SEOTRAFFIC_LOADED__) return;
  window.__SEOTRAFFIC_LOADED__ = true;

  document.addEventListener("DOMContentLoaded", function () {
    var ref = (document.referrer || "").toLowerCase();
    if (!ref.includes("google.")) return;

    var wrapper = document.createElement("div");
    wrapper.innerHTML = \`
      <div id="API_SEOTRAFFIC">
        <div class="st-logo-wrap">
          <img class="st-logo" src="${logo}" alt="SEO Traffic Logo" />
        </div>

        <div class="st-content">
          <div class="st-title">SEO TRAFFIC</div>
          <div id="stHint" class="st-status">Nhấn nút để lấy mã</div>
          <div id="countdown" class="st-status" style="display:none;"></div>
          <div id="result" class="st-status success" style="display:none;"></div>
        </div>

        <div class="st-action">
          <button id="getKeyBtn">LẤY MÃ</button>
        </div>
      </div>
    \`;

    var widget = wrapper.firstElementChild;
    document.body.appendChild(widget);

    var style = document.createElement("style");
    style.textContent = \`
      #API_SEOTRAFFIC{
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 520px;
        margin: 20px auto 0;
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 14px 16px;
        border-radius: 18px;
        background: rgba(10, 19, 44, 0.92);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255,255,255,0.10);
        box-shadow: 0 18px 40px rgba(0,0,0,0.18);
        color: #fff;
      }

      .st-logo-wrap{
        width: 138px;
        height: 46px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .st-logo{
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
      }

      .st-content{
        flex: 1;
        min-width: 0;
      }

      .st-title{
        font-size: 13px;
        font-weight: 800;
        letter-spacing: 1.1px;
        color: #ffffff;
        margin-bottom: 4px;
      }

      .st-status{
        font-size: 13px;
        line-height: 1.45;
        color: #d1d5db;
        word-break: break-word;
      }

      .st-status.success{
        color: #86efac;
        font-weight: 700;
      }

      .st-action{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      #getKeyBtn{
        border: none;
        outline: none;
        cursor: pointer;
        padding: 11px 16px;
        border-radius: 12px;
        font-size: 13px;
        font-weight: 800;
        color: #fff;
        background: linear-gradient(135deg, #2563eb, #06b6d4);
        box-shadow: 0 10px 20px rgba(37,99,235,0.28);
        transition: transform .15s ease, opacity .15s ease;
        white-space: nowrap;
      }

      #getKeyBtn:hover{
        transform: translateY(-1px);
        opacity: .96;
      }

      #getKeyBtn:active{
        transform: translateY(0);
      }

      @media(max-width: 640px){
        #API_SEOTRAFFIC{
          width: 100%;
          max-width: 100%;
          margin: 16px auto 0;
          padding: 12px;
          gap: 12px;
          border-radius: 16px;
        }

        .st-logo-wrap{
          width: 112px;
          height: 40px;
        }

        .st-title{
          font-size: 12px;
        }

        .st-status{
          font-size: 12px;
        }

        #getKeyBtn{
          padding: 10px 14px;
          font-size: 12px;
          border-radius: 10px;
        }
      }
    \`;
    document.head.appendChild(style);

    function generateKey() {
      var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      var part = function () {
        return Array.from({ length: 4 }, function () {
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("");
      };
      return "Nhập mã page bất kỳ-" + part() + "-" + part();
    }

    var button = document.getElementById("getKeyBtn");
    var countdown = document.getElementById("countdown");
    var result = document.getElementById("result");
    var hint = document.getElementById("stHint");

    if (!button || !countdown || !result || !hint) return;

    button.onclick = function () {
      button.style.display = "none";
      hint.style.display = "none";
      countdown.style.display = "block";

      var time = ${waitTime};
      countdown.innerHTML = "Vui lòng chờ: " + time + "s";

      var timer = setInterval(function () {
        time--;
        countdown.innerHTML = "Vui lòng chờ: " + time + "s";

        if (time <= 0) {
          clearInterval(timer);
          countdown.style.display = "none";
          result.style.display = "block";
          result.innerHTML = "KEY: " + generateKey();
        }
      }, 1000);
    };
  });
})();
`;
}


function toolPage() {
  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SEO Traffic Tool</title>
  <style>
    *{box-sizing:border-box}
    body{
      margin:0;
      font-family:Arial,sans-serif;
      background:linear-gradient(135deg,#07142e,#0b1f4f,#083b39);
      color:#fff;
      min-height:100vh;
      padding:30px;
    }
    .wrap{
      max-width:1100px;
      margin:0 auto;
    }
    .title{
      font-size:24px;
      font-weight:700;
      margin-bottom:8px;
    }
    .sub{
      color:#d6def8;
      margin-bottom:24px;
      line-height:1.6;
    }
    .grid{
      display:grid;
      grid-template-columns:1.2fr 1fr;
      gap:20px;
    }
    .card{
      background:rgba(15,22,53,.75);
      border:1px solid rgba(255,255,255,.12);
      border-radius:18px;
      padding:20px;
      box-shadow:0 12px 30px rgba(0,0,0,.18);
    }
    label{
      display:block;
      font-size:14px;
      margin:14px 0 8px;
      color:#dfe7ff;
    }
    input,select,textarea{
      width:100%;
      border-radius:12px;
      border:1px solid rgba(255,255,255,.12);
      background:#1a2342;
      color:#fff;
      padding:14px;
      outline:none;
      font-size:15px;
    }
    textarea{min-height:140px;resize:vertical}
    .row{
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:14px;
    }
    .btns{
      display:flex;
      gap:12px;
      margin-top:18px;
      flex-wrap:wrap;
    }
    button{
      border:none;
      border-radius:12px;
      padding:14px 18px;
      cursor:pointer;
      font-size:15px;
      font-weight:700;
    }
    .primary{background:#2e7df7;color:#fff}
    .muted{background:#1f2a4f;color:#fff}
    .copy{background:#1f8f4d;color:#fff;width:160px}
    .box{
      background:rgba(255,255,255,.04);
      border:1px solid rgba(255,255,255,.1);
      border-radius:16px;
      padding:14px;
      margin-top:14px;
    }
    .small{
      font-size:13px;
      color:#d6def8;
      line-height:1.7;
      margin-top:14px;
    }
    .mono{
      font-family:Consolas,monospace;
      word-break:break-all;
      white-space:pre-wrap;
    }
    button:disabled{
      opacity:.7;
      cursor:not-allowed;
    }
    @media(max-width:900px){
      .grid{grid-template-columns:1fr}
      .row{grid-template-columns:1fr}
    }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="title">SEO Traffic Tool</div>
    <div class="sub">
      Tạo code theo domain khách + seconds + logo + prefix. Sau khi tạo sẽ ra license, script URL và embed code.
    </div>

    <div class="grid">
      <div class="card">
        <h3>Tạo code</h3>

        <div class="row">
          <div>
            <label>ADMIN_KEY (Bearer)</label>
            <input id="admin_key" placeholder="Nhập ADMIN_KEY để tạo mã" />
          </div>
          <div>
            <label>Domain khách</label>
            <input id="domain" placeholder="vd: thamtuconan.net" />
          </div>
        </div>

        <div class="row">
          <div>
            <label>Seconds</label>
            <select id="seconds">
              <option value="60">60</option>
              <option value="90" selected>90</option>
              <option value="150">150</option>
              <option value="180">180</option>
              <option value="300">300</option>
            </select>
          </div>
          <div>
            <label>Logo URL (tùy chọn)</label>
            <input id="logo" placeholder="Để trống sẽ dùng logo SEO Traffic mặc định" />
          </div>
        </div>

        <div class="row">
          <div>
            <label>Key Prefix (tùy chọn, mặc định SEO-)</label>
            <input id="prefix" value="SEO-" />
          </div>
          <div>
            <label>Hạn dùng (YYYY-MM-DD, tùy chọn)</label>
            <input id="expires" placeholder="2026-12-31" />
          </div>
        </div>

        <div class="btns">
          <button class="primary" id="createBtn">TẠO CODE</button>
          <button class="muted" id="clearBtn">XÓA KẾT QUẢ</button>
        </div>

        <div class="small">
          • Script chỉ chạy đúng domain đã đăng ký.<br/>
          • Mở trực tiếp file JS có thể bị chặn nếu thiếu Referer.<br/>
          • Domain phải nhập dạng không có http/https.
        </div>
      </div>

      <div class="card">
        <h3>Kết quả</h3>

        <div class="box">
          <div>Code</div>
          <div id="codeBox" class="mono">—</div>
        </div>

        <div class="box">
          <div>Script URL</div>
          <div id="urlBox" class="mono">—</div>
          <div class="btns"><button class="copy" id="copyUrl">COPY URL</button></div>
        </div>

        <div class="box">
          <div>Embed</div>
          <div id="embedBox" class="mono">—</div>
          <div class="btns"><button class="copy" id="copyEmbed">COPY EMBED</button></div>
        </div>

        <div class="box">
          <div>JSON response</div>
          <textarea id="jsonBox" readonly placeholder="JSON sẽ hiện ở đây"></textarea>
        </div>
      </div>
    </div>
  </div>

  <script>
    function cleanCopyText(text){
      return String(text || "")
        .replace(/\\s+/g, " ")
        .trim();
    }

    async function copyText(text, button){
      const clean = cleanCopyText(text);
      if(!clean || clean === "—") return;

      try{
        await navigator.clipboard.writeText(clean);

        if(button){
          const oldText = button.textContent;
          button.textContent = "ĐÃ COPY";
          button.disabled = true;

          setTimeout(function(){
            button.textContent = oldText;
            button.disabled = false;
          }, 1200);
        }
      }catch(e){
        alert("Copy thất bại, trình duyệt chặn clipboard.");
      }
    }

    document.getElementById("copyUrl").onclick = function(){
      copyText(document.getElementById("urlBox").textContent, this);
    };

    document.getElementById("copyEmbed").onclick = function(){
      copyText(document.getElementById("embedBox").textContent, this);
    };

    document.getElementById("clearBtn").onclick = function(){
      document.getElementById("codeBox").textContent = "—";
      document.getElementById("urlBox").textContent = "—";
      document.getElementById("embedBox").textContent = "—";
      document.getElementById("jsonBox").value = "";
    };

    document.getElementById("createBtn").onclick = async function(){
      const payload = {
        domain: document.getElementById("domain").value.trim(),
        seconds: Number(document.getElementById("seconds").value || 90),
        logo: document.getElementById("logo").value.trim(),
        prefix: document.getElementById("prefix").value.trim() || "SEO-",
        expires: document.getElementById("expires").value.trim()
      };

      const adminKey = document.getElementById("admin_key").value.trim();

      try{
        const res = await fetch("/admin/create", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "authorization": "Bearer " + adminKey
          },
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        document.getElementById("jsonBox").value = JSON.stringify(data, null, 2);
        document.getElementById("codeBox").textContent = data.code || "—";
        document.getElementById("urlBox").textContent = data.script_url || "—";
        document.getElementById("embedBox").textContent = data.embed || "—";
      }catch(e){
        document.getElementById("jsonBox").value = JSON.stringify({
          ok: false,
          error: "Request failed"
        }, null, 2);
      }
    };
  </script>
</body>
</html>`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/tool") {
      return text(toolPage(), 200, "text/html; charset=UTF-8");
    }

    if (url.pathname === "/admin/create" && request.method === "POST") {
      const token = getBearerToken(request);
      if (!token || token !== env.ADMIN_KEY) {
        return json({ ok: false, error: "Unauthorized" }, 401);
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return json({ ok: false, error: "Invalid JSON body" }, 400);
      }

      const domain = String(body.domain || "").trim().toLowerCase();
      const seconds = Number(body.seconds || 90);
      const logo = String(body.logo || "").trim();
      const prefix = String(body.prefix || "SEO-").trim();
      const expires = String(body.expires || "").trim();

      if (!domain) {
        return json({ ok: false, error: "Thiếu domain" }, 400);
      }

      if (!/^[a-z0-9.-]+$/.test(domain)) {
        return json({ ok: false, error: "Domain không hợp lệ" }, 400);
      }

      if (![60, 90, 150, 180, 300].includes(seconds)) {
        return json({ ok: false, error: "Seconds không hợp lệ" }, 400);
      }

      const code = generateLicense(prefix);
      const record = {
        active: true,
        domain,
        seconds,
        logo,
        prefix,
        expires,
        createdAt: new Date().toISOString()
      };

      await env.seo_traffic.put(code, JSON.stringify(record));

      const scriptUrl = `${url.origin}/traffic.js?lic=${encodeURIComponent(code)}`;
      const embed = buildEmbed(scriptUrl);

      return json({
        ok: true,
        code,
        script_url: scriptUrl,
        embed,
        data: record
      });
    }

    if (url.pathname === "/traffic.js") {
      const licenseKey = (url.searchParams.get("lic") || "").trim();
      if (!licenseKey) {
        return text("// missing license", 403, "application/javascript; charset=UTF-8");
      }

      const raw = await env.seo_traffic.get(licenseKey);
      if (!raw) {
        return text("// invalid license", 403, "application/javascript; charset=UTF-8");
      }

      let license;
      try {
        license = JSON.parse(raw);
      } catch {
        return text("// bad license data", 500, "application/javascript; charset=UTF-8");
      }

      if (!license.active) {
        return text("// inactive license", 403, "application/javascript; charset=UTF-8");
      }

      if (isExpired(license.expires)) {
        return text("// expired license", 403, "application/javascript; charset=UTF-8");
      }

      const referer = request.headers.get("Referer") || "";
      const refererHost = getHostnameFromReferer(referer);

      const allowed = [license.domain, "www." + license.domain].map(v => String(v).toLowerCase());
      if (!refererHost || !allowed.includes(refererHost)) {
        return text("// domain not allowed", 403, "application/javascript; charset=UTF-8");
      }

      return new Response(buildClientScript(license), {
        headers: {
          "content-type": "application/javascript; charset=UTF-8",
          "cache-control": "private, max-age=300",
          "vary": "Referer"
        }
      });
    }

    if (url.pathname === "/") {
      return text("hzbacklinks.shop worker is running");
    }

    return text("Not found", 404);
  }
};
