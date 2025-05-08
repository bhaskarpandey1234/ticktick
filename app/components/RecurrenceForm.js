// 'use client';

// import { useState, useEffect } from 'react';
// import DatePicker from './DatePicker';
// import api from '../lib/api';

// export default function RecurrenceForm({ taskId }) {
//   const [frequency, setFrequency] = useState('daily');
//   const [interval, setInterval] = useState(1);
//   const [daysOfWeek, setDaysOfWeek] = useState([]);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   useEffect(() => {
//     api.get(`/recurrence/get/${taskId}`)
//       .then(res => {
//         const r = res.data;
//         setFrequency(r.frequency);
//         setInterval(r.interval);
//         setDaysOfWeek(r.daysOfWeek || []);
//         setStartDate(r.startDate?.split('T')[0] || '');
//         setEndDate(r.endDate?.split('T')[0] || '');
//       })
//       .catch(() => {});
//   }, [taskId]);

//   const toggleDay = day => {
//     setDaysOfWeek(prev =>
//       prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
//     );
//   };

//   const submit = async () => {
//     const payload = { taskId, frequency, interval, daysOfWeek, startDate, endDate };
//     try {
//       await api.post('/recurrence/create', payload);
//     } catch {
//       await api.patch(`/recurrence/update/${taskId}`, payload);
//     }
//     alert('Recurrence saved');
//   };

//   const remove = async () => {
//     try{
//     await api.delete(`/recurrence/delete/${taskId}`);
//     }catch(err){
//       console.log(err);
//       alert("recurrence not found");
//     }
//     // reset form
//     setFrequency('daily');
//     setInterval(1);
//     setDaysOfWeek([]);
//     setStartDate('');
//     setEndDate('');
//   };

//   return (
//     <div className="p-4 bg-white rounded shadow mt-4">
//       <h3 className="font-semibold mb-2">Recurrence</h3>
//       {/* Frequency */}
//       <div className="mb-2">
//         <label>Frequency</label>
//         <select
//           value={frequency}
//           onChange={e => setFrequency(e.target.value)}
//           className="ml-2 p-1 border rounded"
//         >
//           <option value="daily">Daily</option>
//           <option value="weekly">Weekly</option>
//           <option value="monthly">Monthly</option>
//           <option value="yearly">Yearly</option>
//         </select>
//       </div>

//       {/* Interval */}
//       <div className="mb-2">
//         <label>Interval (every X)</label>
//         <input
//           type="number"
//           value={interval}
//           onChange={e => setInterval(e.target.value)}
//           className="ml-2 p-1 border rounded w-16"
//         />
//       </div>

//       {/* Days of Week */}
//       {frequency === 'weekly' && (
//         <div className="mb-2">
//           <label>Days of Week</label>
//           <div className="flex space-x-2 ml-2">
//             {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
//               <button
//                 key={d}
//                 onClick={() => toggleDay(d)}
//                 className={`p-1 border rounded ${daysOfWeek.includes(d) ? 'bg-blue-200' : ''}`}
//               >
//                 {d}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Start/End Dates */}
//       <div className="mb-2">
//         <label>Start Date</label> <DatePicker value={startDate} onChange={setStartDate} />
//       </div>
//       <div className="mb-2">
//         <label>End Date</label> <DatePicker value={endDate} onChange={setEndDate} />
//       </div>

//       {/* Actions */}
//       <div className="flex space-x-2 mt-4">
//         <button
//           onClick={submit}
//           className="px-4 py-2 bg-green-500 text-white rounded"
//         >
//           Save
//         </button>
//         <button
//           onClick={remove}
//           className="px-4 py-2 bg-red-500 text-white rounded"
//         >
//           Remove
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from 'react';
import DatePicker from './DatePicker';
import api from '../lib/api';
import DateTimePicker from 'react-datetime-picker';
import DueDatePicker from './DueDatePicker';


export default function RecurrenceForm({ taskId,closeModal }) {
  const [frequency, setFrequency] = useState('daily');
  const [interval, setInterval] = useState(1);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    api.get(`/recurrence/get/${taskId}`)
      .then(res => {
        const r = res.data;
        if (r) {
          setFrequency(r.frequency || 'daily');
          setInterval(r.interval || 1);
          setDaysOfWeek(r.daysOfWeek || []);
          setStartDate(r.startDate?.split('T')[0] || '');
          setEndDate(r.endDate?.split('T')[0] || '');
        }
      })
      .catch(() => {});
  }, [taskId]);

  const toggleDay = (day) => {
    setDaysOfWeek(prev =>
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const submit = async () => {
    const payload = { taskId, frequency, interval: Number(interval), daysOfWeek, startDate, endDate };

    try {
      await api.patch(`/recurrence/update/${taskId}`, payload);
      // await api.post('/recurrence/create', payload);
      closeModal();
      // alert('Recurrence saved');
    } catch {
      try{
              await api.post('/recurrence/create', payload);
      }
        catch(err){
          alert('Failed to save recurrence');
          console.error(err);
        }  
    }
  };

  const remove = async () => {
    try {
      await api.delete(`/recurrence/delete/${taskId}`);
      closeModal();
      // alert('Recurrence removed');

      // Reset form
      setFrequency('daily');
      setInterval(1);
      setDaysOfWeek([]);
      setStartDate('');
      setEndDate('');
    } catch (err) {
      alert("No recurrence found");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mt-4 space-y-4">
      <h3 className="text-lg font-semibold">Recurrence Settings</h3>

      {/* Frequency */}
      <div>
        <label className="block font-medium">Frequency</label>
        <select
          value={frequency}
          onChange={e => setFrequency(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Interval */}
      <div>
        <label className="block font-medium">Interval (every X {frequency})</label>
        <input
          type="number"
          value={interval}
          min={1}
          onChange={e => setInterval(e.target.value)}
          className="mt-1 p-2 border rounded w-24"
        />
      </div>

      {/* Days of the Week */}
      {frequency === 'weekly' && (
        <div>
          <label className="block font-medium">Days of Week</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`px-3 py-1 rounded border ${
                  daysOfWeek.includes(day)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dates */}
      <div>
        <label className="block font-medium">Start Date</label>
        <DueDatePicker value={startDate} onChange={setStartDate} />
      </div>
      <div>
        <label className="block font-medium">End Date</label>
        <DueDatePicker  value={endDate} onChange={setEndDate} />
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={submit}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Save
        </button>
        <button
          onClick={remove}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
