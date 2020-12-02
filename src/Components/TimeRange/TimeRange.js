import React, { useEffect, useRef } from "react";
import { AiOutlineLine } from "react-icons/ai";

export default function TimeRange({onOfficeHoursFromChange, onOfficeHoursToChange}) {
  const officeHoursFrom = useRef();
  const officeHoursTo = useRef();
  
  useEffect(() => {
    if (onOfficeHoursFromChange) {
        onOfficeHoursFromChange(officeHoursFrom);
    }

    if (onOfficeHoursToChange) {
        onOfficeHoursToChange(officeHoursTo);
    }
  }, [officeHoursFrom, onOfficeHoursFromChange, officeHoursTo, onOfficeHoursToChange]);

  return (
    <>
      <label className="meeting-details-title">Time frames</label>

      <div className="meeting-details-time-container">
        <input
          className="meeting-details-time"
          defaultValue={"08:00"}
          type="time"
          ref={officeHoursFrom}
          required
        />
        <span className="meeting-details-time-line">
          <AiOutlineLine />
        </span>
        <input
          className="meeting-details-time"
          defaultValue={"17:00"}
          type="time"
          ref={officeHoursTo}
          required
        />
      </div>
    </>
  );
}
