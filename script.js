// 오늘 날짜 표시
const todayEl = document.getElementById("today");
const today = new Date();
todayEl.textContent = today.toLocaleDateString();

// 기본 기념일
const defaultEvents = [
  { name: "새해", date: "2026-01-01" },
  { name: "밸런타인데이", date: "2026-02-14" },
  { name: "화이트데이", date: "2026-03-14" },
  { name: "어린이날", date: "2026-05-05" },
  { name: "한글날", date: "2025-10-09" },
  { name: "크리스마스", date: "2025-12-25" },
  { name: "빼빼로데이", date: "2025-11-11" }
];

function calcDday(eventDate) {
  const today = new Date();
  const dday = new Date(eventDate);
  const diff = Math.floor((dday - today) / (1000 * 60 * 60 * 24));
  if (diff > 0) return `D-${diff}`;
  else if (diff === 0) return "D-Day 🎉";
  else return `+${Math.abs(diff)}일`;
}

function renderEvents(list, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  list.forEach(ev => {
    const div = document.createElement("div");
    div.className = "day-card";
    div.innerHTML = `<h3>${ev.name}</h3><p>${calcDday(ev.date)}</p>`;
    container.appendChild(div);
  });
}

// 기본 기념일 표시
renderEvents(defaultEvents, "default-days");

// 사용자 기념일 (localStorage 저장)
const customEvents = JSON.parse(localStorage.getItem("customEvents")) || [];
renderEvents(customEvents, "custom-days");

document.getElementById("add-btn").addEventListener("click", () => {
  const name = prompt("기념일 이름을 입력하세요:");
  const date = prompt("날짜를 YYYY-MM-DD 형식으로 입력하세요:");
  if (name && date) {
    customEvents.push({ name, date });
    localStorage.setItem("customEvents", JSON.stringify(customEvents));
    renderEvents(customEvents, "custom-days");
  }
});

// 배경 업로드
const bgUpload = document.getElementById("bg-upload");
const resetBg = document.getElementById("reset-bg");

if (localStorage.getItem("background")) {
  document.body.style.backgroundImage = `url(${localStorage.getItem("background")})`;
}

bgUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function(evt) {
    const imgData = evt.target.result;
    document.body.style.backgroundImage = `url(${imgData})`;
    localStorage.setItem("background", imgData);
  };
  reader.readAsDataURL(file);
});

resetBg.addEventListener("click", () => {
  document.body.style.backgroundImage = "";
  localStorage.removeItem("background");
});

// =========================
// 🔑 Firebase 로그인 기능
// =========================
const auth = firebase.auth();

// HTML 요소
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userInfo = document.getElementById("userInfo");

// 로그인
loginBtn.addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      userInfo.textContent = `${user.displayName}님 환영합니다!`;
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
    })
    .catch(error => {
      console.error("로그인 오류:", error);
    });
});

// 로그아웃
logoutBtn.addEventListener("click", () => {
  auth.signOut().then(() => {
    userInfo.textContent = "로그아웃 되었습니다.";
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  });
});
