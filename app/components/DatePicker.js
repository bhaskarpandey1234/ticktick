"use client";
import { useState } from 'react'

export default function DatePicker({ value, onChange }) {
  return (
    <input
      type="date"
      value={value ? value.split('T')[0] : ''}
      onChange={e => onChange(e.target.value)}
      className="p-1 border rounded"
    />
  )
}
