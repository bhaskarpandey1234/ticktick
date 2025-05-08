// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { useAuth } from '../context/AuthContext'
// import { useTasks } from '../context/TaskContext'
// import api from '../lib/api'            // ← import your Axios wrapper

// export default function TaskForm() {
//   const { user } = useAuth()
//   const router = useRouter()
//   const { state, a,dispatch } = useTasks()

//   const [showList,setShowList]=useState();

//   // form state
//   const [title, setTitle] = useState('')
//   const [description, setDescription] = useState('')
//   const [dueDate, setDueDate] = useState('')
//   const [priority, setPriority] = useState('medium')
//   const [status, setStatus] = useState('pending')

//   //recurrence form state
//   const [frequency, setFrequency] = useState('daily')
//   const [interval, setInterval] = useState(1)
//   const [daysOfWeek, setDaysOfWeek] = useState([])    // e.g. ['Mon','Wed']
//   const [startDate, setStartDate] = useState('')
//   const [endDate, setEndDate] = useState('')

//   useEffect(() => {
//     if (user === null) router.push('/login')
//   }, [user])

//   useEffect(() => {
//     api.get('/task/get').then(res =>
//       dispatch({ type: 'SET_TASKS', payload: res.data })
//     );
//   },[showList]);

//   const addTask = async () => {
//     const payload = {
//       title,
//       description,
//       dueDate: dueDate ? new Date(dueDate).toISOString() : null,
//       priority,
//       status,
//     }

//     try {
//       const res = await api.post('/task/create', payload)
//       const newTask=res.data;
//       dispatch({ type: 'ADD_TASK', payload: res.data })

//       const recPayload = {
//         taskId: newTask.id,
//         frequency,
//         interval,
//         daysOfWeek,
//         startDate: startDate ? new Date(startDate).toISOString() : null,
//         endDate: endDate ? new Date(endDate).toISOString() : null,
//       }

//       await api.post('/recurrence/create', recPayload)
//       // clear form
//       setTitle('')
//       setDescription('')
//       setDueDate('')
//       setPriority('medium')
//       setStatus('pending')

     
//     } catch (err) {
//       console.error('Failed to create task', err)
//       alert('Could not create task.')
//     }
//   }

//   return (
//     <div className=" p-6 bg-gray-100">
//       {/* New Task Form */}
//       <div className="bg-white p-4 rounded shadow mb-6 space-y-4">
//         <div>
//           <label className="block font-medium">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={e => setTitle(e.target.value)}
//             className="w-full p-2 border rounded"
//             placeholder="Task title"
//           />
//         </div>

//         <div>
//           <label className="block font-medium">Description</label>
//           <textarea
//             value={description}
//             onChange={e => setDescription(e.target.value)}
//             className="w-full p-2 border rounded"
//             placeholder="Task description"
//           />
//         </div>

//         <div className="flex space-x-4">
//           <div>
//             <label className="block font-medium">Due Date</label>
//             <input
//               type="date"
//               value={dueDate}
//               onChange={e => setDueDate(e.target.value)}
//               className="p-2 border rounded"
//             />
//           </div>

//           <div>
//             <label className="block font-medium">Priority</label>
//             <select
//               value={priority}
//               onChange={e => setPriority(e.target.value)}
//               className="p-2 border rounded"
//             >
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </select>
//           </div>

//           <div>
//             <label className="block font-medium">Status</label>
//             <select
//               value={status}
//               onChange={e => setStatus(e.target.value)}
//               className="p-2 border rounded"
//             >
//               <option value="pending">Pending</option>
//               <option value="in_progress">In Progress</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>
//         </div>

//         <button
//           onClick={addTask}
//           className="px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           Add Task
//         </button>
//       </div>
//       {/* Toggle List Visibility */}
//      </div>

//   )
  
// }

"use client";

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { useTasks } from '../context/TaskContext'
import api from '../lib/api'
import { PlusCircle, Calendar, Flag, CheckCircle2 } from 'lucide-react'

export default function TaskForm({onTaskCreated}) {
  const { user } = useAuth()
  const router = useRouter()
  const { dispatch } = useTasks()

  // Form state
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('medium')
  const [status, setStatus] = useState('pending')

  // Recurrence
  const [frequency, setFrequency] = useState('daily')
  const [interval, setInterval] = useState(1)
  const [daysOfWeek, setDaysOfWeek] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const [open, setOpen] = useState(true)

  useEffect(() => {
    if (user === null) router.push('/login')
  }, [user])

  const addTask = async () => {
    if (!title.trim() || !description.trim() || !dueDate) {
      alert('Please fill out all required fields: Title, Description, and Due Date.');
      return;
    }
    const payload = {
      title,
      description,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      priority,
      status,
    }

    try {
      const res = await api.post('/task/create', payload)
      const newTask = res.data
      dispatch({ type: 'ADD_TASK', payload: newTask })

      const recPayload = {
        taskId: newTask.id,
        frequency,
        interval,
        daysOfWeek,
        startDate: startDate ? new Date(startDate).toISOString() : null,
        endDate: endDate ? new Date(endDate).toISOString() : null,
      }

      const recurrence=await api.post('/recurrence/create', recPayload)

      // Reset form
      setTitle('')
      setDescription('')
      setDueDate('')
      setPriority('medium')
      setStatus('pending')
      if(onTaskCreated){
        onTaskCreated();
      }
    } catch (err) {
      console.error('Failed to create task', err)
      alert('Could not create task.')
    }
  }

  return (
    <div className="mb-8">
      {/* Header Toggle */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition"
      >
        <PlusCircle className="w-5 h-5" />
        <span className="font-semibold text-lg">New Task</span>
      </button>

      {/* Task Form */}
      {open && (
        <div className="mt-4 bg-white rounded-xl shadow p-6 space-y-5 transition-all">
          <div>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Task title"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Add a description..."
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Due Date
              </label>
              <input
                type="datetime-local"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="p-2 border rounded-md"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium flex items-center gap-2">
                <Flag className="w-4 h-4" /> Priority
              </label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Status
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="text-right">
            <button
              onClick={addTask}
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Add Task
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

      