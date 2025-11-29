const monthYearEl = document.getElementById('monthYear');
const calendarBody = document.getElementById('calendarBody');
const prevBtn = document.getElementById('prevMonth');
const nextBtn = document.getElementById('nextMonth');

let currentDate = new Date();

function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    // تنظیم عنوان
    const monthNames = [
            "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    monthYearEl.textContent = `${monthNames[month]} ${year}`;

    // اولین روز ماه
    const firstDay = new Date(year, month, 1).getDay(); // 0 = یکشنبه
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // ساختن سلول‌ها
    let html = '';
    let dayCounter = 1;
    for (let week = 0; week < 6; week++) {
        html += '<tr>';
        for (let day = 0; day < 7; day++) {
            const cellIndex = week * 7 + day;
            if (cellIndex >= (firstDay === 0 ? 6 : firstDay - 1) && dayCounter <= daysInMonth) {
                const today = new Date();
                const isToday = (dayCounter === today.getDate() &&
                                 month === today.getMonth() &&
                                 year === today.getFullYear());

                html += `<td class="${isToday ? 'today' : ''}">${dayCounter}</td>`;
                dayCounter++;
            } else {
                html += '<td></td>';
            }
        }
        html += '</tr>';
        if (dayCounter > daysInMonth) break;
    }
    calendarBody.innerHTML = html;
}

// رویدادهای ناوبری
prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

// اولین رندر
renderCalendar(currentDate);
