<div id="API_SEOTRAFFIC">

<div id="traffic_box">

<div class="logo_st">
<img src="https://ibb.co/H1YcfnT/logo.png">
</div>

<button id="getKeyBtn">LẤY MÃ</button>

<div id="countdown" style="display:none;"></div>
<div id="result" style="display:none;"></div>

</div>

</div>

<style>

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
align-items:center;   /* căn giữa theo chiều dọc */
justify-content:center; /* căn giữa ngang toàn bộ */
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

</style>

<script>

document.addEventListener("DOMContentLoaded", function(){

// ===== DOMAIN ĐƯỢC PHÉP =====
let allowedDomains = [
"onepunchmantruyen.com",
"www.onepunchmantruyen.com"
];

if(!allowedDomains.includes(location.hostname)){
document.getElementById("API_SEOTRAFFIC").style.display="none";
return;
}

// ===== CHỈ CHẠY KHI TỪ GOOGLE =====
let ref = document.referrer.toLowerCase();

if(!ref.includes("google.")){
document.getElementById("API_SEOTRAFFIC").style.display="none";
return;
}

// ===== RANDOM KEY =====

function generateKey(){

let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
let part = () => Array.from({length:4}, () => chars[Math.floor(Math.random()*chars.length)]).join("");

return "Nhập mã page bất kỳ-"+part()+"-"+part();

}

// ===== SCRIPT CHÍNH =====

let waitTime = 10;

let button = document.getElementById("getKeyBtn");
let countdown = document.getElementById("countdown");
let result = document.getElementById("result");

button.onclick = function(){

button.style.display="none";
countdown.style.display="block";

let time = waitTime;

countdown.innerHTML = "Vui lòng chờ: "+time+"s";

let timer = setInterval(function(){

time--;

countdown.innerHTML = "Vui lòng chờ: "+time+"s";

if(time <= 0){

clearInterval(timer);

countdown.style.display="none";
result.style.display="block";

result.innerHTML = "KEY: "+generateKey();

}

},1000);

}

});

</script>
