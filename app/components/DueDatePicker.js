"use client";
import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export default function DueDatePicker({ value, onChange }) {
  return (
    <div className="mb-2">
      <label className="block font-medium mb-1">Due Date & Time</label>
      <DateTimePicker
        onChange={onChange}
        value={value}
        disableClock={false}
        className="border rounded p-2"
      />
    </div>
  );
}
