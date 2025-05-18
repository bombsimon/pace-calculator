import React from "react";

interface ResultTableProps {
  distance: number;
  time: string;
}

function calculateSpeedAndPace(time: string, distance: number) {
  const [hour, minute, second] = time.split(":").map(Number);
  const hours = hour + (minute + second / 60) / 60;
  const speed = distance / hours;
  const paceMinutes = Math.floor((hours / distance) * 60);
  const paceSeconds = Math.round((((hours / distance) * 60) % 1) * 60);

  return {
    speed: Number.isFinite(speed) ? speed.toFixed(2) : "0.00",
    pace: Number.isFinite(paceMinutes)
      ? `${paceMinutes}:${paceSeconds.toString().padStart(2, "0")}`
      : "0:00",
  };
}

export default function ResultTable({ distance, time }: ResultTableProps) {
  const { speed, pace } = calculateSpeedAndPace(time, distance);

  return (
    <ul className="calc">
      <li className="calcrow">
        <div className="calcprop">Time</div>
        <div className="calcdata">{time}</div>
      </li>
      <li className="calcrow">
        <div className="calcprop">Distance</div>
        <div className="calcdata">
          {distance} <span className="calcunit">km</span>
        </div>
      </li>
      <li className="calcrow">
        <div className="calcprop">Speed</div>
        <div className="calcdata">
          {speed} <span className="calcunit">km/h</span>
        </div>
      </li>
      <li className="calcrow">
        <div className="calcprop">Pace</div>
        <div className="calcdata">
          {pace} <span className="calcunit">min/km</span>
        </div>
      </li>
    </ul>
  );
}
