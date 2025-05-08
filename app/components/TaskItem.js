// // "use client";
// // import { useState } from 'react'
// // import { useTasks } from '../context/TaskContext'
// // import api from '../lib/api';


// // export default function TaskItem({ task }) {
// //   const { dispatch } = useTasks()
// //   const [editing, setEditing] = useState(false)
// //   const [title, setTitle] = useState(task.title)

// //   const toggleComplete = async () => {
// //     const res = await fetch(`/api/task/${task.id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ isCompleted: !task.isCompleted }) })
// //     const res =await api.patch('/task/')
// //     const updated = await res.json()
// //     dispatch({ type: 'UPDATE_TASK', payload: updated })
// //   }

// //   const saveEdit = async () => {
// //     const res = await fetch(`/api/task/${task.id}`, { method: 'PUT', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ title }) })
// //     const updated = await res.json()
// //     dispatch({ type: 'UPDATE_TASK', payload: updated })
// //     setEditing(false)
// //   }

// //   const deleteTask = async () => {
// //     await fetch(`/api/task/${task.id}`, { method: 'DELETE' })
// //     dispatch({ type: 'DELETE_TASK', payload: task.id })
// //   }

// //   return (
// //     <li className="flex items-center justify-between p-2 bg-white rounded shadow">
// //       <div className="flex items-center">
// //         <input type="checkbox" checked={task.isCompleted} onChange={toggleComplete} className="mr-2" />
// //         {editing ? (
// //           <input value={title} onChange={e => setTitle(e.target.value)} onBlur={saveEdit} className="border-b" />
// //         ) : (
// //           <span onDoubleClick={() => setEditing(true)} className={task.isCompleted ? 'line-through text-gray-500' : ''}>{task.title}</span>
// //         )}
// //       </div>
// //       <button onClick={deleteTask} className="text-red-500">Delete</button>
// //     </li>
// //   )
// // }
// 'use client';

// import { useEffect, useState } from 'react';
// import { TaskProvider,useTasks } from '../context/TaskContext';
// import api from '../lib/api';
// import RecurrenceForm from './RecurrenceForm';
// import {useRouter} from 'next/navigation';

// export default function TaskItem({ task }) {
//   const { dispatch, a } = useTasks();
//   const router=useRouter();
  
//   const { state } = useTasks()
// console.log(state,'state');

//   const [editing, setEditing] = useState(false);
//   const [title, setTitle] = useState(task.title);
  
  

//   const toggleComplete = async () => {
//     const res = await api.patch('/task/update/'+task.id, {
//       id: task.id,
//       isCompleted: !task.isCompleted,
//     });
//     dispatch({ type: 'UPDATE_TASK', payload: res.data });
//   };

//   const saveEdit = async () => {
//     const res = await api.patch('/task/update/'+task.id, { id: task.id, title });
//     dispatch({ type: 'UPDATE_TASK', payload: res.data });
//     setEditing(false);
//   };

//   const deleteTask = async () => {
//     await api.delete('/task/delete/'+task.id, { data: { id: task.id } });
//     dispatch({ type: 'DELETE_TASK', payload: task.id });
//   };

//   return (
//     <TaskProvider>
//     <li className="flex items-center justify-between p-2 bg-white rounded shadow">
//       <div className="flex items-center">
//         <input
//           type="checkbox"
//           checked={task.isCompleted}
//           onChange={toggleComplete}
//           className="mr-2"
//         />
//         {editing ? (
//           <input
//             value={title}
//             onChange={e => setTitle(e.target.value)}
//             onBlur={saveEdit}
//             className="border-b"
//           />
//         ) : (
//           <span
//             onDoubleClick={() => setEditing(true)}
//             className={task.isCompleted ? 'line-through text-gray-500' : ''}
//           >
//             {task.title}
//           </span>
//         )}
//       </div>
//       <button onClick={deleteTask} className="text-red-500">
//         Delete
//       </button>
//       <button
//           onClick={() => router.push(`/recurrence/${task.id}`)}
//           className="px-2 py-1 bg-green-500 text-white rounded"
//         >
//           Set Recurrence
//         </button>
//       {/* <RecurrenceForm taskId={task.id} /> */}

//     </li>
//     </TaskProvider>
//   );
// }


// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useTasks } from '../context/TaskContext';
// import api from '../lib/api';

// export default function TaskItem({ task }) {
//   const { dispatch } = useTasks();
//   const router = useRouter();

//   const [editing, setEditing] = useState(false);
//   const [title, setTitle] = useState(task.title);

//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (editing && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [editing]);

//   const toggleComplete = async () => {
//     const res = await api.patch(`/task/update/${task.id}`, {
//       isCompleted: !task.isCompleted,
//     });
//     dispatch({ type: 'UPDATE_TASK', payload: res.data });
//   };

//   const saveEdit = async () => {
//     if (title.trim() === '') return;
//     const res = await api.patch(`/task/update/${task.id}`, { title });
//     dispatch({ type: 'UPDATE_TASK', payload: res.data });
//     setEditing(false);
//   };

//   const deleteTask = async () => {
//     await api.delete(`/task/delete/${task.id}`, { data: { id: task.id } });
//     dispatch({ type: 'DELETE_TASK', payload: task.id });
//   };

//   return (
//     <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-md shadow-sm border hover:shadow transition duration-150">
//       <div className="flex items-center gap-2 flex-1">
//         <input
//           type="checkbox"
//           checked={task.isCompleted}
//           onChange={toggleComplete}
//           className="h-4 w-4 text-blue-500"
//         />
//         {editing ? (
//           <input
//             ref={inputRef}
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             onBlur={saveEdit}
//             onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
//             className="flex-1 border-b border-gray-300 focus:outline-none px-1"
//           />
//         ) : (
//           <span
//             onDoubleClick={() => setEditing(true)}
//             className={`flex-1 cursor-pointer ${
//               task.isCompleted ? 'line-through text-gray-400' : 'text-gray-800'
//             }`}
//           >
//             {task.title}
//           </span>
//         )}
//       </div>

//       <div className="flex gap-2 text-sm">
//         <button
//           onClick={deleteTask}
//           className="px-2 py-1 rounded text-red-600 hover:bg-red-100 transition"
//         >
//           Delete
//         </button>
//         <button
//           onClick={() => router.push(`/recurrence/${task.id}`)}
//           className="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
//         >
//           Recurrence
//         </button>
//       </div>
//     </li>
//   );
// }
// "use client";
// import { useState, useRef, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useTasks } from '../context/TaskContext';
// import api from '../lib/api';

// export default function TaskItem({ task }) {
//   const { dispatch } = useTasks();
//   const router = useRouter();

//   const [editing, setEditing] = useState(false);
//   const [title, setTitle] = useState(task.title);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (editing && inputRef.current) inputRef.current.focus();
//   }, [editing]);

//   const toggleComplete = async () => {
//     const res = await api.patch(`/task/update/${task.id}`, {
//       isCompleted: !task.isCompleted,
//     });
//     dispatch({ type: 'UPDATE_TASK', payload: res.data });
//   };

//   const saveEdit = async () => {
//     if (title.trim() === '') return;
//     const res = await api.patch(`/task/update/${task.id}`, { title });
//     dispatch({ type: 'UPDATE_TASK', payload: res.data });
//     setEditing(false);
//   };

//   const deleteTask = async () => {
//     await api.delete(`/task/delete/${task.id}`, { data: { id: task.id } });
//     dispatch({ type: 'DELETE_TASK', payload: task.id });
//   };

//   return (
//     <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-md shadow-sm border hover:shadow transition duration-150">
//       <div className="flex items-center gap-2 flex-1">
//         <input
//           type="checkbox"
//           checked={task.isCompleted}
//           onChange={toggleComplete}
//           className="h-4 w-4 text-blue-500"
//         />
//         {editing ? (
//           <input
//             ref={inputRef}
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             onBlur={saveEdit}
//             onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
//             className="flex-1 border-b border-gray-300 focus:outline-none px-1"
//           />
//         ) : (
//           <span
//             onClick={() => router.push(`/task/${task.id}`)}
//             className={`flex-1 cursor-pointer ${
//               task.isCompleted ? 'line-through text-gray-400' : 'text-gray-800'
//             } hover:underline`}
//           >
//             {task.title}
//           </span>
//         )}
//       </div>

//       <div className="flex gap-2 text-sm">
//         <button
//           onClick={deleteTask}
//           className="px-2 py-1 rounded text-red-600 hover:bg-red-100 transition"
//         >
//           Delete
//         </button>
//         <button
//           onClick={() => router.push(`/recurrence/${task.id}`)}
//           className="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
//         >
//           Recurrence
//         </button>
//       </div>
//     </li>
//   );
// }

// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useTasks } from '../context/TaskContext';
// import api from '../lib/api';

// export default function TaskItem({ task }) {
//   const { dispatch } = useTasks();
//   const router = useRouter();

//   const [editing, setEditing] = useState(false);
//   const [title, setTitle] = useState(task.title);
//   const inputRef = useRef(null);

//   useEffect(() => {
//     if (editing && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [editing]);

//   const toggleComplete = async () => {
//     const res = await api.patch(`/task/update/${task.id}`, {
//       isCompleted: !task.isCompleted,
//     });
//     dispatch({ type: 'UPDATE_TASK', payload: res.data });
//   };

//   const saveEdit = async () => {
//     if (title.trim() === '') return;
//     const res = await api.patch(`/task/update/${task.id}`, { title });
//     dispatch({ type: 'UPDATE_TASK', payload: res.data });
//     setEditing(false);
//   };

//   const deleteTask = async () => {
//     await api.delete(`/task/delete/${task.id}`, { data: { id: task.id } });
//     dispatch({ type: 'DELETE_TASK', payload: task.id });
//   };

//   return (
//     <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-md shadow-sm border hover:shadow transition duration-150">
//       <div className="flex items-center gap-2 flex-1">
//         <input
//           type="checkbox"
//           checked={task.isCompleted}
//           onChange={toggleComplete}
//           className="h-4 w-4 text-blue-500"
//         />
//         {editing ? (
//           <input
//             ref={inputRef}
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             onBlur={saveEdit}
//             onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
//             className="flex-1 border-b border-gray-300 focus:outline-none px-1"
//           />
//         ) : (
//           <span
//             onDoubleClick={() => setEditing(true)}
//             className={`flex-1 cursor-pointer ${
//               task.isCompleted ? 'line-through text-gray-400' : 'text-gray-800'
//             }`}
//           >
//             {task.title}
//           </span>
//         )}
//       </div>

//       <div className="flex gap-2 text-sm">
//         <button
//           onClick={deleteTask}
//           className="px-2 py-1 rounded text-red-600 hover:bg-red-100 transition"
//         >
//           Delete
//         </button>
//         <button
//           onClick={() => router.push(`/recurrence/${task.id}`)}
//           className="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
//         >
//           Recurrence
//         </button>
//         <button
//           onClick={() => router.push(`/task/${task.id}`)}
//           className="px-2 py-1 rounded bg-gray-700 text-white hover:bg-gray-800 transition"
//         >
//           More
//         </button>
//       </div>
//     </li>
//   );
// }

// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useTasks } from '../context/TaskContext';
// import api from '../lib/api';

// import { Trash2, MoreHorizontal } from 'lucide-react';

// export default function TaskItem({ task }) {
//   const { dispatch } = useTasks();
//   const router = useRouter();

//   const [editingTitle, setEditingTitle] = useState(false);
//   const [editingDesc, setEditingDesc] = useState(false);
//   const [editingStatus, setEditingStatus] = useState(false);

//   const [title, setTitle] = useState(task.title);
//   const [description, setDescription] = useState(task.description);
//   const [status, setStatus] = useState(task.status);

//   const titleRef = useRef(null);
//   const descRef = useRef(null);

//   useEffect(() => {
//     if (editingTitle && titleRef.current) titleRef.current.focus();
//     if (editingDesc && descRef.current) descRef.current.focus();
//   }, [editingTitle, editingDesc]);

//   const handleUpdate = async (updatedFields) => {
//     try {
//       const res = await api.patch(`/task/update/${task.id}`, updatedFields);
//       dispatch({ type: 'UPDATE_TASK', payload: res.data });
//     } catch (err) {
//       console.error('Error updating task:', err);
//     }
//   };

//   const handleDelete = async () => {
//     await api.delete(`/task/delete/${task.id}`, { data: { id: task.id } });
//     dispatch({ type: 'DELETE_TASK', payload: task.id });
//   };

//   return (
//     <tr className="border-b hover:bg-gray-50 transition text-sm text-gray-700">
//       {/* Title */}
//       <td className="p-3">
//         {editingTitle ? (
//           <input
//             ref={titleRef}
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             onBlur={() => {
//               setEditingTitle(false);
//               if (title !== task.title) handleUpdate({ title });
//             }}
//             onKeyDown={(e) => e.key === 'Enter' && titleRef.current.blur()}
//             className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         ) : (
//           <span
//             onDoubleClick={() => setEditingTitle(true)}
//             className="cursor-pointer hover:underline"
//             title="Double-click to edit title"
//           >
//             {title}
//           </span>
//         )}
//       </td>

//       {/* Description */}
//       <td className="p-3">
//         {editingDesc ? (
//           <input
//             ref={descRef}
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             onBlur={() => {
//               setEditingDesc(false);
//               if (description !== task.description)
//                 handleUpdate({ description });
//             }}
//             onKeyDown={(e) => e.key === 'Enter' && descRef.current.blur()}
//             className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//           />
//         ) : (
//           <span
//             onClick={() => setEditingDesc(true)}
//             className="cursor-pointer hover:underline"
//             title={description}
//           >
//             {description.length > 10
//               ? description.substring(0, 10) + '...'
//               : description}
//           </span>
//         )}
//       </td>

//       {/* Status */}
//       <td className="p-3">
//         {editingStatus ? (
//           <select
//             value={status}
//             onChange={(e) => {
//               setStatus(e.target.value);
//               handleUpdate({ status: e.target.value });
//               setEditingStatus(false);
//             }}
//             onBlur={() => setEditingStatus(false)}
//             className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             <option value="pending">Pending</option>
//             <option value="in_progress">In Progress</option>
//             <option value="completed">Completed</option>
//           </select>
//         ) : (
//           <span
//             onClick={() => setEditingStatus(true)}
//             className="cursor-pointer text-blue-600 hover:underline"
//             title="Click to change status"
//           >
//             {status}
//           </span>
//         )}
//       </td>
//       {/* priority,duedate */}

//       {/* Actions */}
//       <td className="p-3 text-right space-x-3">
//       <button
//           onClick={() => router.push(`/recurrence/${task.id}`)}
//           className="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
//         >
//           Recurrence
//         </button>
//         <button
//           onClick={handleDelete}
//           className="text-red-500 hover:text-red-700 transition"
//           title="Delete Task"
//         >
//           <Trash2 size={18} />
//         </button>
        
//         <button
//           onClick={() => router.push(`/task/${task.id}`)}
//           className="text-gray-600 hover:text-gray-800 transition"
//           title="View Details"
//         >
//           <MoreHorizontal size={18} />
//         </button>
//       </td>
//     </tr>
//   );
// }
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTasks } from '../context/TaskContext';
import api from '../lib/api';

import { Trash2, MoreHorizontal } from 'lucide-react';

export default function TaskItem({ task,view }) {
  const { dispatch } = useTasks();
  const router = useRouter();

  const [editingTitle, setEditingTitle] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);
  const [editingStatus, setEditingStatus] = useState(false);
  const [editingPriority, setEditingPriority] = useState(false);
  const [editingDueDate, setEditingDueDate] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const titleRef = useRef(null);
  const descRef = useRef(null);

  const dueDateRef = useRef(null);// new
  
  // Function to format date and time
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    weekday: 'short',  // Short day of the week (e.g., "Mon")
    year: 'numeric',   // Full year (e.g., "2025")
    month: 'short',    // Abbreviated month (e.g., "May")
    day: 'numeric',    // Day of the month (e.g., "10")
    hour: '2-digit',   // Hour in 2-digit format (e.g., "01")
    minute: '2-digit', // Minute in 2-digit format (e.g., "07")
    second: '2-digit', // Second in 2-digit format (e.g., "00")
    hour12: true       // 12-hour format with AM/PM (e.g., "PM")
  });
};

const formattedDate = formatDate(task.dueDate);
//new use effect
useEffect(() => {
  const handleClickOutside = (event) => {
    if (dueDateRef.current && !dueDateRef.current.contains(event.target)) {
      setEditingDueDate(false); // Close the input and revert to previous state
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  // Cleanup event listener on component unmount
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  useEffect(() => {
    if (editingTitle && titleRef.current) titleRef.current.focus();
    if (editingDesc && descRef.current) descRef.current.focus();
  }, [editingTitle, editingDesc]);

  const handleUpdate = async (updatedFields) => {
    try {
      const res = await api.patch(`/task/update/${task.id}`, updatedFields);
      dispatch({ type: 'UPDATE_TASK', payload: res.data });
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDelete = async () => {
    await api.delete(`/task/delete/${task.id}`, { data: { id: task.id } });
    dispatch({ type: 'DELETE_TASK', payload: task.id });
  };

  // return (
  //   <tr className="border-b hover:bg-gray-50 transition text-sm text-gray-700">
  //     {/* Title */}
  //     <td className="p-3">
  //       {editingTitle ? (
  //         <input
  //           ref={titleRef}
  //           value={title}
  //           onChange={(e) => setTitle(e.target.value)}
  //           onBlur={() => {
  //             setEditingTitle(false);
  //             if (title !== task.title) handleUpdate({ title });
  //           }}
  //           onKeyDown={(e) => e.key === 'Enter' && titleRef.current.blur()}
  //           className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
  //         />
  //       ) : (
  //         <span
  //           onDoubleClick={() => setEditingTitle(true)}
  //           className="cursor-pointer hover:underline"
  //           title="Double-click to edit title"
  //         >
  //           {title}
  //         </span>
  //       )}
  //     </td>

  //     {/* Description */}
  //     <td className="p-3">
  //       {editingDesc ? (
  //         <input
  //           ref={descRef}
  //           value={description}
  //           onChange={(e) => setDescription(e.target.value)}
  //           onBlur={() => {
  //             setEditingDesc(false);
  //             if (description !== task.description)
  //               handleUpdate({ description });
  //           }}
  //           onKeyDown={(e) => e.key === 'Enter' && descRef.current.blur()}
  //           className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
  //         />
  //       ) : (
  //         <span
  //           onClick={() => setEditingDesc(true)}
  //           className="cursor-pointer hover:underline"
  //           title={description}
  //         >
  //           {description.length > 10
  //             ? description.substring(0, 10) + '...'
  //             : description}
  //         </span>
  //       )}
  //     </td>

  //     {/* Status */}
  //     <td className="p-3">
  //       {editingStatus ? (
  //         <select
  //           value={status}
  //           onChange={(e) => {
  //             setStatus(e.target.value);
  //             handleUpdate({ status: e.target.value });
  //             setEditingStatus(false);
  //           }}
  //           onBlur={() => setEditingStatus(false)}
  //           className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
  //         >
  //           <option value="pending">Pending</option>
  //           <option value="in_progress">In Progress</option>
  //           <option value="completed">Completed</option>
  //         </select>
  //       ) : (
  //         <span
  //           onClick={() => setEditingStatus(true)}
  //           className="cursor-pointer text-blue-600 hover:underline"
  //           title="Click to change status"
  //         >
  //           {status}
  //         </span>
  //       )}
  //     </td>

  //     {/* Priority */}
  //     <td className="p-3">
  //       {editingPriority ? (
  //         <select
  //           value={priority}
  //           onChange={(e) => {
  //             setPriority(e.target.value);
  //             handleUpdate({ priority: e.target.value });
  //             setEditingPriority(false);
  //           }}
  //           onBlur={() => setEditingPriority(false)}
  //           className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
  //         >
  //           <option value="low">Low</option>
  //           <option value="medium">Medium</option>
  //           <option value="high">High</option>
  //         </select>
  //       ) : (
  //         <span
  //           onClick={() => setEditingPriority(true)}
  //           className="cursor-pointer text-yellow-500 hover:underline"
  //           title="Click to change priority"
  //         >
  //           {priority}
  //         </span>
  //       )}
  //     </td>

  //     {/* Due Date */}
  //     <td className="p-3">
  //       {editingDueDate ? (
  //         <input
  //           type="datetime-local"
  //           value={dueDate}
  //           onChange={(e) => {
  //             setDueDate(e.target.value);
  //             handleUpdate({ dueDate: e.target.value });
  //             setEditingDueDate(false);
  //           }}
  //           onBlur={() => setEditingDueDate(false)}
  //           className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
  //         />
  //       ) : (
  //         <span
  //           onClick={() => setEditingDueDate(true)}
  //           className="cursor-pointer text-gray-600 hover:underline"
  //           title="Click to change due date"
  //         >
  //           {formattedDate}
  //         </span>
  //       )}
  //     </td>

  //     {/* Actions */}
  //     <td className="p-3 text-right space-x-3">
  //       <button
  //         onClick={() => router.push(`/recurrence/${task.id}`)}
  //         className="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
  //       >
  //         Recurrence
  //       </button>
  //       <button
  //         onClick={handleDelete}
  //         className="text-red-500 hover:text-red-700 transition"
  //         title="Delete Task"
  //       >
  //         <Trash2 size={18} />
  //       </button>
        
  //       <button
  //         onClick={() => router.push(`/task/${task.id}`)}
  //         className="text-gray-600 hover:text-gray-800 transition"
  //         title="View Details"
  //       >
  //         <MoreHorizontal size={18} />
  //       </button>
  //     </td>
  //   </tr>
  // );

  return view === 'card' ? (
    <div className="bg-white rounded-lg shadow p-4 space-y-2 animate-fade-in">
      <div>
        <strong>Title:</strong>{' '}
        {editingTitle ? (
          <input
            ref={titleRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => {
              setEditingTitle(false);
              if (title !== task.title) handleUpdate({ title });
            }}
            onKeyDown={(e) => e.key === 'Enter' && titleRef.current.blur()}
            className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ) : (
          <span onClick={() => setEditingTitle(true)}>
            {title}
            </span>
        )}
      </div>
      <div>
        <strong>Description:</strong>{' '}
        {editingDesc ? (
          <input
            ref={descRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => {
              setEditingDesc(false);
              if (description !== task.description) handleUpdate({ description });
            }}
            onKeyDown={(e) => e.key === 'Enter' && descRef.current.blur()}
            className="border rounded px-2 py-1 w-full"
          />
        ) : (
          <span onClick={() => setEditingDesc(true)}>{description}</span>
        )}
      </div>
      <div>
        <strong>Status:</strong>{' '}
        {
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              handleUpdate({ status: e.target.value });
              setEditingStatus(false);
            }}
            className="border rounded px-2 py-1"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        }
        {/* {editingStatus ? (
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              handleUpdate({ status: e.target.value });
              setEditingStatus(false);
            }}
            className="border rounded px-2 py-1"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        ) : (
          <span onClick={() => setEditingStatus(true)}>{status}</span>
        )} */}
      </div>
      <div>
        <strong>Priority:</strong>{' '}
        {
          <select
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              handleUpdate({ priority: e.target.value });
              setEditingPriority(false);
            }}
            className="border rounded px-2 py-1"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        }
        {/* {editingPriority ? (
          <select
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              handleUpdate({ priority: e.target.value });
              setEditingPriority(false);
            }}
            className="border rounded px-2 py-1"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        ) : (
          <span onClick={() => setEditingPriority(true)}>{priority}</span>
        )} */}
      </div>
      {/* <div>
        <strong>Due:</strong>{' '}
        {editingDueDate ? (
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => {
              setDueDate(e.target.value);
              handleUpdate({ dueDate: e.target.value });
              setEditingDueDate(false);
            }}
            className="border rounded px-2 py-1"
          />
        ) : (
          <span onClick={() => setEditingDueDate(true)}>{formattedDate}</span>
        )}
      </div> */}
      <div>
      <strong>Due:</strong>{' '}
      {editingDueDate ? (
        <input
          ref={dueDateRef}
          type="datetime-local"
          value={dueDate}
          onChange={(e) => {
            setDueDate(e.target.value); // Update the due date
          }}
          onBlur={() => {
            setEditingDueDate(false); // Close input when it loses focus
            handleUpdate({ dueDate }); // Call handleUpdate to save the value
          }}
          className="border rounded px-2 py-1"
        />
      ) : (
        <span onClick={() => setEditingDueDate(true)}>{formattedDate || dueDate}</span>
      )}
    </div>
      <div className="flex gap-3 justify-end pt-2">
        <button
          onClick={() => router.push(`/recurrence/${task.id}`)}
          className="text-blue-600"
        >
          Recurrence
        </button>
        <button onClick={handleDelete} className="text-red-500">
          <Trash2 size={18} />
        </button>
        <button
          onClick={() => router.push(`/task/${task.id}`)}
          className="text-gray-600"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  ) : 
    (
      <tr className="border-b hover:bg-gray-50 transition text-sm text-gray-700">
        {/* Title */}
        <td className="p-3">
          {editingTitle ? (
            <input
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => {
                setEditingTitle(false);
                if (title !== task.title) handleUpdate({ title });
              }}
              onKeyDown={(e) => e.key === 'Enter' && titleRef.current.blur()}
              className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <span
              onDoubleClick={() => setEditingTitle(true)}
              className="cursor-pointer hover:underline"
              title="Double-click to edit title"
            >
              {title}
            </span>
          )}
        </td>
  
        {/* Description */}
        <td className="p-3">
          {editingDesc ? (
            <input
              ref={descRef}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => {
                setEditingDesc(false);
                if (description !== task.description)
                  handleUpdate({ description });
              }}
              onKeyDown={(e) => e.key === 'Enter' && descRef.current.blur()}
              className="border border-gray-300 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <span
              onClick={() => setEditingDesc(true)}
              className="cursor-pointer hover:underline"
              title={description}
            >
              {description.length > 10
                ? description.substring(0, 10) + '...'
                : description}
            </span>
          )}
        </td>
  
        {/* Status */}
        <td className="p-3">
          {/* {editingStatus ? (
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                handleUpdate({ status: e.target.value });
                setEditingStatus(false);
              }}
              onBlur={() => setEditingStatus(false)}
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          ) : (
            <span
              onClick={() => setEditingStatus(true)}
              className="cursor-pointer text-blue-600 hover:underline"
              title="Click to change status"
            >
              {status}
            </span>
          )} */}
          {
            <select
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                handleUpdate({ status: e.target.value });
              }}
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          }
        </td>
  
        {/* Priority */}
        <td className="p-3">
          {
            <select
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value);
                handleUpdate({ priority: e.target.value });
              }}
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          }
        </td>
  
        {/* Due Date */}
        <td className="p-3">
          {editingDueDate ? (
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => {
                setDueDate(e.target.value);
                handleUpdate({ dueDate: e.target.value });
                setEditingDueDate(false);
              }}
              onBlur={() => setEditingDueDate(false)}
              className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <span
              onClick={() => setEditingDueDate(true)}
              className="cursor-pointer text-gray-600 hover:underline"
              title="Click to change due date"
            >
              {formattedDate}
            </span>
          )}
        </td>
  
        {/* Actions */}
        <td className="p-3 text-right space-x-3">
          <button
            onClick={() => router.push(`/recurrence/${task.id}`)}
            className="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            Recurrence
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 transition"
            title="Delete Task"
          >
            <Trash2 size={18} />
          </button>
          
          <button
            onClick={() => router.push(`/task/${task.id}`)}
            className="text-gray-600 hover:text-gray-800 transition"
            title="View Details"
          >
            <MoreHorizontal size={18} />
          </button>
        </td>
      </tr>
    );
}
