// 현재 월 연도 초기화
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth() + 1; // 0부터 시작하는 월에 +1
let selectedDate = null; // 선택된 날짜를 저장할 변수

// 달력 만드는 함수
function createCalendar(year, month) {
  const today = new Date(); // 오늘 날짜
  const firstDay = new Date(year, month - 1, 1); // 달력 첫날
  const lastDay = new Date(year, month, 0); // 달력 마지막날

  // 현재 월 표시
  document.getElementById('currentMonth').textContent = `${year}년 ${month}월`;

  let html = "<tr>";

  // 첫 주 빈칸 채우기
  for (let i = 0; i < firstDay.getDay(); i++) {
    html += "<td></td>"; // 첫날의 요일에 맞춰 빈칸 추가
  }

  // 날짜 채우기
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const currentDay = new Date(year, month - 1, day).getDay();
    const isToday = today.getFullYear() === year &&
                    today.getMonth() + 1 === month &&
                    today.getDate() === day;

    // 날짜 셀 생성 (클릭 이벤트 추가)
    html += `<td class="${isToday ? 'today' : ''}" data-day="${day}" onclick="selectDate(${year}, ${month}, ${day})">${day}</td>`;

    // 일요일마다 줄바꿈 추가
    if (currentDay === 6) {
      html += "</tr><tr>";
    }
  }

  // 마지막 주 빈칸 채우기
  const lastDayOfWeek = lastDay.getDay();
  if (lastDayOfWeek !== 6) {
    for (let i = lastDayOfWeek + 1; i < 7; i++) {
      html += "<td></td>"; // 마지막 주의 빈칸 추가
    }
  }

  html += "</tr>";

  // 달력 출력
  document.getElementById('calendarBody').innerHTML = html;
}

// 날짜 선택 함수
function selectDate(year, month, day) {
  selectedDate = new Date(year, month - 1, day); // 선택된 날짜 저장
  console.log("선택된 날짜:", selectedDate); // 콘솔에 선택된 날짜 출력
  createCalendar(currentYear, currentMonth); // 달력 재생성
  updateSelectedDate(); // 선택된 날짜 업데이트
}

// 선택된 날짜 업데이트 함수
function updateSelectedDate() {
  const selectedDateElement = document.querySelector(".day-input-here");
  if (selectedDate && selectedDateElement) {
    selectedDateElement.textContent = `${selectedDate.getFullYear()}년 ${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일`;
    console.log("날짜 업데이트됨:", selectedDateElement.textContent); // 날짜 업데이트 확인
  }
}

// 날짜 조절 함수
function changeMonth(offset) {
  currentMonth += offset;

  if (currentMonth > 12) {
    currentMonth = 1;
    currentYear++;
  } else if (currentMonth < 1) {
    currentMonth = 12;
    currentYear--;
  }

  createCalendar(currentYear, currentMonth); // 월 변경 시 달력 재생성
}

// 초기 달력 생성
createCalendar(currentYear, currentMonth);