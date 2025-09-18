// 오늘 날짜 표시
function formatDate(date) {
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
}
document.getElementById("today").textContent = formatDate(new Date());

// 기본 기념일 목록
const defaultEvents = [
  { name: "새해", date: "2026-01-01" },
  { name: "밸런타인데이", date: "2026-02-14" },
  { name: "화이트데이", date: "2026-03-14" },
  { name: "어린이날", date: "2026-05-05" },
  { name: "한글날", date: "2025-10-09" },
  { name: "크리스마스", date: "2025-12-25" },
  { name: "빼빼로데이", date: "2025-11-11" }
];

// 날짜 차이 계산
function calcDDay(dateStr) {
  const today = new Date();
  const eventDate = new Date(dateStr);
  const diff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
  return diff >= 0 ? `D-${diff}` : `+${Math.abs(diff)}일`;
}

// 카드 추가 함수
function addCard(parentId, name, dateStr) {
  const div = document.createElement("div");
  div.className = "day-card";
  div.innerHTML = `<b>${name}</b><br>${calcDDay(dateStr)}`;
  document.getElementById(parentId).appendChild(div);
}

// 기본 기념일 표시
defaultEvents.forEach(e => addCard("default-days", e.name, e.date));

// 날짜 입력 변환 (YY-MM-DD → YYYY-MM-DD)
function normalizeDate(input) {
  let parts = input.replace(/\s+/g, "-").split("-");
  if (parts.length === 3) {
    if (parts[0].length === 2) {
      let year = parseInt(parts[0], 10);
      parts[0] = year < 50 ? "20" + parts[0] : "19" + parts[0];
    }
  }
  return parts.join("-");
}

// 사용자 기념일 추가
document.getElementById("addBtn").addEventListener("click", () => {
  const name = prompt("기념일 이름을 입력하세요:");
  let date = prompt("날짜를 입력하세요 (예: 26-09-18 또는 2025-09-18):");
  if (name && date) {
    const fixedDate = normalizeDate(date);
    addCard("custom-days", name, fixedDate);
  }
});

// 배경 변경 기능
document.getElementById("bgUpload").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(event) {
    document.body.style.backgroundImage = `url(${event.target.result})`;
    document.body.style.backgroundSize = "cover";
  };
  reader.readAsDataURL(file);
});

document.getElementById("resetBg").addEventListener("click", () => {
  document.body.style.backgroundImage = "";
  document.body.style.backgroundColor = "#f5f5f5";
});
