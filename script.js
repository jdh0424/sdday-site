const defaultEvents = [
  { title: "크리스마스", date: "12-25" },
  { title: "빼빼로데이", date: "11-11" },
  { title: "신정", date: "01-01" }
];

function calcDday(targetDate) {
  const today = new Date();
  const year = today.getFullYear();
  let eventDate = new Date(`${year}-${targetDate}`);
  if (eventDate < today) eventDate = new Date(`${year + 1}-${targetDate}`);
  const diff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
  return diff === 0 ? "오늘!" : `D-${diff}`;
}

function renderDefaultDays() {
  const list = document.getElementById("defaultList");
  list.innerHTML = "";
  defaultEvents.forEach(ev => {
    const li = document.createElement("li");
    li.textContent = `${ev.title}: ${calcDday(ev.date)}`;
    list.appendChild(li);
  });
}

function saveCustomDays(days) {
  localStorage.setItem("customDays", JSON.stringify(days));
}
function loadCustomDays() {
  return JSON.parse(localStorage.getItem("customDays")) || [];
}

function renderCustomDays() {
  const list = document.getElementById("customList");
  const days = loadCustomDays();
  list.innerHTML = "";
  days.forEach(ev => {
    const li = document.createElement("li");
    li.textContent = `${ev.title}: ${calcDday(ev.date)}`;
    list.appendChild(li);
  });
}

document.getElementById("addDayBtn").addEventListener("click", () => {
  const today = new Date();
  const date = `${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const title = `내 기념일 ${loadCustomDays().length + 1}`;
  const days = loadCustomDays();
  days.push({ title, date });
  saveCustomDays(days);
  renderCustomDays();
});

document.getElementById("bgUpload").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    document.body.style.backgroundImage = `url(${reader.result})`;
    document.body.style.backgroundSize = "cover";
    localStorage.setItem("bgImage", reader.result);
  };
  reader.readAsDataURL(file);
});

document.getElementById("resetBg").addEventListener("click", () => {
  document.body.style.backgroundImage = "";
  localStorage.removeItem("bgImage");
});

window.addEventListener("load", () => {
  const bg = localStorage.getItem("bgImage");
  if (bg) {
    document.body.style.backgroundImage = `url(${bg})`;
    document.body.style.backgroundSize = "cover";
  }
  renderDefaultDays();
  renderCustomDays();
});