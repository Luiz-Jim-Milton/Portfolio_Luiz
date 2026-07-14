
const VALID_USER = "concolores";
const VALID_PASS = "giovanni";

const roles = ["Desenvolvedor Front-end", "Entusiasta de UI/UX", "Aprendiz de JavaScript", "Músico por esporte"];
const typedEl = document.getElementById("typedRole");
let roleIndex = 0, charIndex = 0, deleting = false;

function typeLoop(){
  const current = roles[roleIndex];

  if(!deleting){
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if(charIndex === current.length){
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if(charIndex === 0){
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
});

sidebar.querySelectorAll(".side-nav a").forEach(link => {
  link.addEventListener("click", () => sidebar.classList.remove("open"));
});

const loginForm = document.getElementById("loginForm");
const loginBox = document.getElementById("loginBox");
const videoBox = document.getElementById("videoBox");
const loginMsg = document.getElementById("loginMsg");
const secretVideo = document.getElementById("secretVideo");
const closeVideo = document.getElementById("closeVideo");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value;

  if(user === VALID_USER && pass === VALID_PASS){
    loginMsg.textContent = "acesso concedido. carregando vídeo...";
    loginMsg.className = "login-msg success";

    setTimeout(() => {
      loginBox.classList.add("hidden");
      videoBox.classList.remove("hidden");
      secretVideo.play().catch(() => {
      });
    }, 600);

  } else {
    loginMsg.textContent = "usuário ou senha incorretos.";
    loginMsg.className = "login-msg error";
    loginBox.classList.remove("shake");
    void loginBox.offsetWidth;
    loginBox.classList.add("shake");
  }
});

closeVideo.addEventListener("click", () => {
  secretVideo.pause();
  secretVideo.currentTime = 0;
  videoBox.classList.add("hidden");
  loginBox.classList.remove("hidden");
  loginForm.reset();
  loginMsg.textContent = "";
});
