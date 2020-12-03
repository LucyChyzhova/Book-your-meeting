import React, { useState, useEffect } from "react";
import "react-nice-dates/build/style.css";
import { enGB } from "date-fns/locale";
import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import { AiOutlineLine } from "react-icons/ai";
import "./DateRangeStyle.css";

export default function DateRange({ onStartDateChange, onEndDateChange }) {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    if (onStartDateChange) {
      onStartDateChange(startDate);
    }

    if (onEndDateChange) {
      onEndDateChange(endDate);
    }
  }, [startDate, onStartDateChange, endDate, onEndDateChange]);

  return (
    <>
      <label className="date-range-title">Dates' range</label>
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        minimumDate={new Date()}
        minimumLength={1}
        format="yyyy-MM-dd"
        locale={enGB}
      >
        {({ startDateInputProps, endDateInputProps, focus }) => (
          <div className="date-range-date-container">
            <input
              className={
                "date-range-date input" +
                (focus === START_DATE ? " -focused" : "")
              }
              {...startDateInputProps}
              placeholder=" Start date"
            />
            <span className="date-range-date-line">
              <AiOutlineLine />
            </span>
            <input
              className={
                "date-range-date input" +
                (focus === END_DATE ? " -focused" : "")
              }
              {...endDateInputProps}
              placeholder="End date"
            />
          </div>
        )}
      </DateRangePicker>
    </>
  );
}
