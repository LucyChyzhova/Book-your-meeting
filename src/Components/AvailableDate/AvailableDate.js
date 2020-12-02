import React from "react";
import "./AvailableDateStyle.css";

export default function AvailableDate({ date, startTimes }) {
  const renderStartTimes = () => {
    const availableStartTimes = startTimes.map((startTime) => {
      return (
        <div className="schedule-container-time">
          <p>{startTime.slice(0, -3)}</p>
        </div>
      );
    });

    return availableStartTimes;
  };

  return (
    <div className="schedule-container">
      <h3>{date}</h3>
      <div className="schedule-container-time">{renderStartTimes()}</div>
    </div>
  );
}
