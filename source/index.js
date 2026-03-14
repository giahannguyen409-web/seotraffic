export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/traffic.js") {
      const js = `
(function () {
  if (window.__SEOTRAFFIC_LOADED__) return;
  window.__SEOTRAFFIC_LOADED__ = true;

  document.addEventListener("DOMContentLoaded", function () {
    // ===== DOMAIN ĐƯỢC PHÉP =====
    var allowedDomains = [
      "onepunchmantruyen.com",
      "www.onepunchmantruyen.com"
    ];

    if (!allowedDomains.includes(location.hostname)) {
      return;
    }

    // ===== CHỈ CHẠY KHI TỪ GOOGLE =====
    var ref = (document.referrer || "").toLowerCase();
    if (!ref.includes("google.")) {
      return;
    }

    // ===== TẠO HTML =====
    var wrapper = document.createElement("div");
    wrapper.innerHTML = \`
      <div id="API_SEOTRAFFIC">
        <div id="traffic_box">
          <div class="logo_st">
            <img src="https://hzbacklinks.shop/logo.png" alt="Logo" />
          </div>
          <button id="getKeyBtn">LẤY MÃ</button>
          <div id="countdown" style="display:none;"></div>
          <div id="result" style="display:none;"></div>
        </div>
      </div>
    \`;

    document.body.appendChild(wrapper.firstElementChild);

    // ===== CSS =====
    var style = document.createElement("style");
    style.textContent = \`
      #API_SEOTRAFFIC{
        margin-bottom:30px;
        background:#fff;
        border:1px solid rgba(129,0,0,0.12);
        border-radius:12px;
        padding:8px 12px;
        display:inline-block;
        box-shadow:0 3px 10px rgba(255,77,77,0.3);
        z-index:999999;
        max-width:100%;
      }

      #traffic_box{
        display:flex;
        align-items:center;
        gap:10px;
        flex-wrap:wrap;
      }

      .logo_st{
        width:100px;
        height:40px;
        border-radius:50%;
        overflow:hidden;
        flex-shrink:0;
      }

      .logo_st img{
        width:100%;
        height:100%;
        object-fit:cover;
      }

      #getKeyBtn{
        font-size:13px;
        color:#fff;
        font-weight:bold;
        padding:6px 12px;
        background:#0080FF;
        border-radius:6px;
        border:none;
        cursor:pointer;
      }

      #countdown{
        font-size:12px;
        font-weight:bold;
        color:#333;
      }

      #result{
        font-size:12px;
        font-weight:bold;
        color:#00a651;
        word-break:break-all;
      }

      @media(max-width:600px){
        #API_SEOTRAFFIC{
          width:100%;
          text-align:center;
        }

        #traffic_box{
          display:flex;
          align-items:center;
          justify-content:center;
          gap:12px;
        }

        #getKeyBtn{
          font-size:12px;
          color:#fff;
          font-weight:bold;
          padding:6px 12px;
          background:#ff4d4d;
          border-radius:6px;
          border:none;
          cursor:pointer;
          display:flex;
          align-items:center;
          justify-content:center;
        }
      }
    \`;
    document.head.appendChild(style);

    // ===== RANDOM KEY =====
    function generateKey() {
      var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      var part = function () {
        return Array.from({ length: 4 }, function () {
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("");
      };

      return "Nhập mã page bất kỳ-" + part() + "-" + part();
    }

    // ===== SCRIPT CHÍNH =====
    var waitTime = 10;
    var button = document.getElementById("getKeyBtn");
    var countdown = document.getElementById("countdown");
    var result = document.getElementById("result");

    if (!button || !countdown || !result) return;

    button.onclick = function () {
      button.style.display = "none";
      countdown.style.display = "block";

      var time = waitTime;
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

      return new Response(js, {
        headers: {
          "content-type": "application/javascript; charset=UTF-8",
          "cache-control": "public, max-age=300"
        }
      });
    }

    if (url.pathname === "/") {
      return new Response("hzbacklinks.shop worker is running", {
        headers: {
          "content-type": "text/plain; charset=UTF-8"
        }
      });
    }

    return new Response("Not found", {
      status: 404,
      headers: {
        "content-type": "text/plain; charset=UTF-8"
      }
    });
  }
};
