"use client"

import React, { Suspense, useState } from "react";
import dynamic from 'next/dynamic';

function getCalendarWeekDays(month: number, year: number = new Date().getFullYear()) {
  const monthStart = new Date(Date.UTC(year, month, 1));
  const monthEnd = new Date(Date.UTC(year, month + 1, 0));
  monthStart.setDate(monthStart.getDate() - (monthStart.getDay() + 6) % 7);
  monthEnd.setDate(monthEnd.getDate() + (7 - monthEnd.getDay()) % 7);
  const startTime = monthStart.getTime();
  const dayDelta = 3600 * 24 * 1000;
  const dayCount = Math.floor((monthEnd.getTime() - startTime) / dayDelta) + 1;
  return Array.from({length: dayCount}).map((_, index) => {
    return new Date(startTime + index * dayDelta);
  })
}

function dateStr(date: Date) {
  return `${date.getDate()}/${date.getMonth() + 1}`
}

const monthMap = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Maj",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Okt",
  "Nov",
  "Dec"
];

const dayMap = [
  "Sön",
  "Mån",
  "Tis",
  "Ons",
  "Tor",
  "Fre",
  "Lör",
];

function CalendarDay({active, date, children}: {active: boolean, date: Date, children?: React.ReactNode}) {
  return (
    <div className={`card md-mx-2 ${active ? "" : "opacity-25"}`}>
      <div className="d-flex flex-column flex-md-row">
        <span className="card-header flex-fill p-1 text-center">{dayMap[date.getDay()]}</span>
        <span className="card-header flex-fill p-1 text-center">{dateStr(date)}</span>
      </div>
      <div className="card-body">{children}</div>
    </div>
  )
}

function _BaseCalendar({dates, month, selectMonth}: {dates: Date[], month: number, selectMonth: (m: number) => void}) {
  return (
    <>
      <h2>Kalender</h2>
      <div className="btn-group-vertical mb-2 d-flex d-sm-none" role="group">
      {Array.from({length: 12}).map((_, m) => (
        <button key={m} onClick={() => selectMonth(m)} className={`btn btn-secondary ${month === m ? "active" : ""}`}>{monthMap[m]}</button>
      ))}
      </div>
      <div className="btn-group mb-2 d-none d-sm-flex" role="group">
      {Array.from({length: 12}).map((_, m) => (
        <button key={m} onClick={() => selectMonth(m)} className={`btn btn-secondary ${month === m ? "active" : ""}`}>{monthMap[m]}</button>
      ))}
      </div>
      <div style={{gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr"}} className="d-grid gap-2">
      {dates.map(d => {
        const inMonth = d.getMonth() === month;
        return (
          <CalendarDay key={d.getTime()} active={inMonth} date={d}>
            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
          </CalendarDay>
        )
      })}
      </div>
    </>
  )
}

export const BaseCalendar = dynamic(() => Promise.resolve(_BaseCalendar), {
  ssr: false,
});

export function ConnectedCalendar() {
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const dates = getCalendarWeekDays(month);
  return (
    <BaseCalendar dates={dates} month={month} selectMonth={setMonth}/>
  )
}

export default function Calendar() {

  return (
    <Suspense fallback={<></>}>
      <ConnectedCalendar />
    </Suspense>
  )
}