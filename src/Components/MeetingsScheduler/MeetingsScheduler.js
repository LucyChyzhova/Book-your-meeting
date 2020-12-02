import React, { useState } from "react";
import MeetingDetails from "../MeetingDetails/MeetingDetails";
import SearchPersons from "../SearchAttendees/SearchAttendees";
import AvailableDates from "../AvailableDates/AvailableDates";

export default function MeetingsScheduler() {
  const [foundPersons, setFoundPersons] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  const handleOnFoundPersonsChange = (updatedFoundPersons) => {
    setFoundPersons(updatedFoundPersons);
  };

  const handleOnAvailableTimesChange = (updatedAvailableTimes) => {
    setAvailableTimes(updatedAvailableTimes);
  };

  return (
    <>
      <SearchPersons onFoundPersonsChange={handleOnFoundPersonsChange} />
      <MeetingDetails persons={foundPersons} onAvailableTimesChange={handleOnAvailableTimesChange} />
      <AvailableDates availableTimes={availableTimes}/>
    </>
  );
}
