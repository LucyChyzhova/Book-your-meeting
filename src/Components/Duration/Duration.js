import React, { useRef, useEffect } from "react";

export default function Duration({ onDurationChange }) {
  const meetingDuration = useRef();

  useEffect(() => {
    if (onDurationChange) {
      onDurationChange(meetingDuration);
    }
  }, [meetingDuration, onDurationChange]);

  return (
    <>
      <label className="meeting-details-title">Duration</label>
      <div className="meeting-details-time-duration-container">
        <input className="meeting-details-time-duration"
         defaultValue={"00:30"}
          ref={meetingDuration}
          type="time"
          data-hide-seconds
          required
        />
      </div>
    </>
  );
}
