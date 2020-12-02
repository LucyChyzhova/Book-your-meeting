import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MeetingDetailsStyle.css";
import DateRange from "../DateRange/DateRange";
import TimeRange from "../TimeRange/TimeRange";
import Duration from "../Duration/Duration";

export default function MeetingDetails({ persons, onAvailableTimesChange }) {
  const [availableTimes, setAvailableTimes] = useState([]);
  const [startDate, setStartDate] = useState();  
  const [endDate, setEndDate] = useState();
  const [officeHoursFrom, setOfficeHoursFrom] = useState();
  const [officeHoursTo, setOfficeHoursTo] = useState();
  const [meetingDuration, setMeetingDuration] = useState();
  

  useEffect(() => {
    if (onAvailableTimesChange) {
      onAvailableTimesChange(availableTimes);
    }
  }, [availableTimes, onAvailableTimesChange]);

  const handleOnShowAvalibleTimes = () => {
    const baseUrl = "https://stark-castle-84894.herokuapp.com/suggestions?";

    const employeesUrlFragment = GetEmployeesFragment(persons);
    const fromDate = GetUrlFragement("fromDate", startDate.toLocaleDateString("sv-SE"));
    const toDate = GetUrlFragement("toDate", endDate.toLocaleDateString("sv-SE"));
    const officehoursStart = GetUrlFragement("officehoursStart", officeHoursFrom.current.value);
    const officehoursEnd = GetUrlFragement("officehoursEnd", officeHoursTo.current.value);
    const meetingLength = GetUrlFragement("meetingLength",toMinutes(meetingDuration.current.value));

    const urlWithLastAnd = `${baseUrl}${employeesUrlFragment}${fromDate}${toDate}${officehoursStart}${officehoursEnd}${meetingLength}`;
    const url = urlWithLastAnd.slice(0, -1);

    axios
      .get(url)
      .then((response) => {
        setAvailableTimes(response.data.suggestions);
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  function GetEmployeesFragment(employees) {
    return employees
      .map((employee) => GetUrlFragement("employees", employee.id))
      .join("");
  }

  const GetUrlFragement = (urlParameter, value) => {
    return `${urlParameter}=${encodeURIComponent(value)}&`;
  };

  const toMinutes = (mins) => {
    const hoursDotMinutes = mins;
    const fieldArray = hoursDotMinutes.split(":");
    const minutes = parseInt(fieldArray[0]) * 60 + parseInt(fieldArray[1]);
    return minutes;
  };
  
  const handleOnStartDateChange = (startDate) => {
    setStartDate(startDate);
  };

  const handleOnEndDateChange = (endDate) => {
    setEndDate(endDate);
  };

  const handleOnOfficeHoursFromChange = (officeHoursFrom) => {
    setOfficeHoursFrom(officeHoursFrom);
  };

  const handleOnOfficeHoursToChange = (officeHoursTo) => {
    setOfficeHoursTo(officeHoursTo);
  };

  const handleOnDurationChange = (duration) => {
    setMeetingDuration(duration);
  };

  return (
    <div className="meeting-details-container">
      <DateRange onStartDateChange={handleOnStartDateChange} onEndDateChange={handleOnEndDateChange}/>      
      <TimeRange onOfficeHoursFromChange={handleOnOfficeHoursFromChange} onOfficeHoursToChange={handleOnOfficeHoursToChange}/>
      <Duration onDurationChange={handleOnDurationChange}/>
      
      <div className="meeting-details-show-container">
        <button className="meeting-details-show" onClick={handleOnShowAvalibleTimes}>
          Show available time
        </button>
      </div>
    </div>
  );  
}
