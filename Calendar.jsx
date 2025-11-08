import React from 'react';
import dayjs from 'dayjs';

function chunk(array, size) {
  const res = [];
  for (let i = 0; i < array.length; i += size) res.push(array.slice(i, i + size));
  return res;
}

export default function Calendar({ events = [], current = dayjs() }) {
  const startOfMonth = current.startOf('month');
  const endOfMonth = current.endOf('month');

  const startWeekDay = startOfMonth.day();
  const daysInMonth = current.daysInMonth();
  const totalCells = Math.ceil((startWeekDay + daysInMonth) / 7) * 7;

  const cells = Array.from({ length: totalCells }).map((_, i) => {
    const dayNumber = i - startWeekDay + 1;
    const cellDate = dayjs(startOfMonth).date(dayNumber);
    const inMonth = dayNumber >= 1 && dayNumber <= daysInMonth;
    const iso = cellDate.format('YYYY-MM-DD');
    const cellEvents = events.filter((e) => e.date === iso);

    return { key: i, dayNumber, inMonth, date: cellDate, events: cellEvents };
  });

  const weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  return (
    <>
      <div className="calendar">
        {weekdays.map(d => <div key={d} className="weekday">{d}</div>)}
        {cells.map(cell => {
          const isToday = dayjs().isSame(cell.date, 'day');
          return (
            <div key={cell.key} className={`day-cell ${cell.inMonth ? '' : 'inactive'} ${isToday ? 'today' : ''}`}>
              <div className="day-number">{cell.inMonth ? cell.dayNumber : ''}</div>
              {cell.events.map(ev => (
                <div
                  key={ev.id}
                  className={`event-card ${
                    ev.title.toLowerCase().includes('interview') ? 'interview' :
                    ev.title.toLowerCase().includes('demo') ? 'demo' :
                    ev.title.toLowerCase().includes('standup') ? 'standup' :
                    'review'
                  }`}
                  title={`${ev.title} @ ${ev.time}`}
                >
                  {ev.title} ({ev.time})
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </>
  )
}
