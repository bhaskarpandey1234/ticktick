// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import { useAuth } from './context/AuthContext'
// import { useTasks } from './context/TaskContext'
// import api from './lib/api'            // ← import your Axios wrapper
// import TaskList from './components/TaskList'
// import RecurrenceForm from './components/RecurrenceForm'
// import TaskForm from './components/TaskForm'
// import DatePicker from './components/DatePicker'

// export default function Home() {
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
//     <div className="min-h-screen p-6 bg-gray-100">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">TickTick Clone</h1>
//         <button
//           onClick={() => { localStorage.removeItem('token'); router.push('/login') }}
//           className="px-4 py-2 bg-red-500 text-white rounded"
//         >
//           Logout
//         </button>
       
//       </div>
//       <TaskForm/>
//       <TaskList tasks={state.tasks} />
//     </div>
//   )
// }
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from './context/AuthContext'
import { useTasks } from './context/TaskContext'
import api from './lib/api'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import { Plus } from 'lucide-react'

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()
  const { state, dispatch } = useTasks()
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    if (user === null) router.push('/login')
  }, [user])

  useEffect(() => {
    api.get('/task/get').then(res =>
      dispatch({ type: 'SET_TASKS', payload: res.data })
    )
  }, [showForm])

  const toggleForm = () => setShowForm(prev => !prev)

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="title-logout-container flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🗓️ TickTick Clone</h1>
        <button
          onClick={() => {
            localStorage.removeItem('token')
            router.push('/login')
          }}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
        >
          Logout
        </button>
      </div>

      {/* Add Task Button */}
      <div className="flex  justify-center mb-8">
        <button
          onClick={toggleForm}
          className="text-2xl text-center flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition"
        >
          <Plus className="w-5 h-5 " /> Add Task
        </button>
      </div>

      {/* Task Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative animate-fadeIn">
            <button
              onClick={toggleForm}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
            >
              ✖
            </button>
            <TaskForm onTaskCreated={toggleForm} />
          </div>
        </div>
      )}

      {/* Task List */}
      <TaskList tasks={state.tasks} />
    </div>
  )
}
