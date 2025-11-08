import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Calendar from './components/Calendar';
import eventsData from './events.json';

export default function App() {
  const [current, setCurrent] = useState(dayjs());
  const [events, setEvents] = useState([]);

  useEffect(() => setEvents(eventsData), []);

  const prevMonth = () => setCurrent(d => d.subtract(1,'month'));
  const nextMonth = () => setCurrent(d => d.add(1,'month'));
  const goToday = () => setCurrent(dayjs());

  return (
    <div style={{ padding:'20px', maxWidth:'900px', margin:'0 auto' }}>
      <header>
        <h1>My Custom Calendar</h1>
        <div className="month">{current.format('MMMM YYYY')}</div>
        <div style={{ marginTop:'10px' }}>
          <button onClick={prevMonth}>← Prev</button>
          <button onClick={goToday} style={{ margin:'0 8px' }}>Today</button>
          <button onClick={nextMonth}>Next →</button>
        </div>
      </header>

      <Calendar events={events} current={current} />

      <section className="legend">
        <h3>Legend</h3>
        <div className="legend-item"><div className="legend-color standup"></div> Standup</div>
        <div className="legend-item"><div className="legend-color demo"></div> Product Demo</div>
        <div className="legend-item"><div className="legend-color interview"></div> Interview</div>
        <div className="legend-item"><div className="legend-color review"></div> Review</div>
      </section>
    </div>
  )
}
