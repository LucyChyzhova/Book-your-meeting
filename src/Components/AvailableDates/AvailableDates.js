import React from "react";
import AvailableDate from "../AvailableDate/AvailableDate";

export default function AvailableDates({ availableTimes }) {
  const renderAvailableDates = () => {
    const availableDates = availableTimes.map((availableTime) => {
      return (
        <AvailableDate
          key={availableTime.date}
          date={availableTime.date}
          startTimes={availableTime.start_times}
        />
      );
    });

    return availableDates;
  };

  return <>{renderAvailableDates()} </>;
}
