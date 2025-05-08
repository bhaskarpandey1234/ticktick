// "use client";

// import { useRouter } from 'next/navigation';
// import { use,useEffect, useState } from 'react';
// import api from '../../lib/api';

// export default function TaskDetail({params}) {
//   const router = useRouter();
//   console.log(router);
//   const { id } = use(params);
//   const [task, setTask] = useState(null);

//   useEffect(() => {
//     if (id) {
//       api.get(`/task/${id}`)
//         .then(res => setTask(res.data))
//         .catch(err => console.error('Error fetching task:', err));
//     }
//   }, [id]);

//   if (!task) return <div className="p-4">Loading task...</div>;

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
//       <h1 className="text-2xl font-bold mb-4">{task.title}</h1>
//       <p className="text-gray-600 mb-2"><strong>Status:</strong> {task.status}</p>
//       <p className="text-gray-600 mb-2"><strong>Priority:</strong> {task.priority}</p>
//       <p className="text-gray-600 mb-2"><strong>Completed:</strong> {task.isCompleted ? 'Yes' : 'No'}</p>
//       <p className="text-gray-600 mb-2"><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleString()}</p>
//       <p className="text-gray-600"><strong>Description:</strong> {task.description}</p>
//     </div>
//   );
// }
// 'use client';

// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import api from '../../lib/api';
// import { ArrowLeft } from 'lucide-react';

// export default function TaskDetail({ params }) {
//   const router = useRouter();
//   const { id } = params;
//   const [task, setTask] = useState(null);

//   useEffect(() => {
//     if (id) {
//       api
//         .get(`/task/${id}`)
//         .then((res) => setTask(res.data))
//         .catch((err) => console.error('Error fetching task:', err));
//     }
//   }, [id]);

//   if (!task) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="text-gray-500">Loading task...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-xl font-semibold text-gray-800">Task Details</h1>
//           <button
//             onClick={() => router.back()}
//             className="flex items-center text-blue-600 hover:text-blue-800 transition text-sm"
//           >
//             <ArrowLeft className="mr-1 w-4 h-4" />
//             Back
//           </button>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <h2 className="text-lg font-bold text-gray-700">{task.title}</h2>
//             <p className="text-gray-500 text-sm">{task.description || 'No description provided.'}</p>
//           </div>

//           <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
//             <p><strong>Status:</strong> {task.status}</p>
//             <p><strong>Priority:</strong> {task.priority}</p>
//             <p><strong>Completed:</strong> {task.isCompleted ? 'Yes' : 'No'}</p>
//             <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleString()}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// 'use client';

// import { useRouter } from 'next/navigation';
// import { useEffect, useState,use} from 'react';
// import api from '../../lib/api';
// import { ArrowLeft } from 'lucide-react';

// export default function TaskDetail({ params }) {
//   const router = useRouter();
//   const { id } = use(params);
//   const [task, setTask] = useState(null);
//   const [recurrence,setRecurrence]=useState(null);

//   useEffect(() => {
//     if (id) {
//       api
//         .get(`/task/${id}`)
//         .then((res) => setTask(res.data))
//         .catch((err) => console.error('Error fetching task:', err));
//       api.get(`/recurrence/${id}`)
//       .then((res)=>setRecurrence(res.data))
//       .catch((err)=>console.err('Error fetching recurrence:',err));
//     }
//   }, [id]);

//   if (!task) {
//     return (
//       <div className="flex justify-center items-center h-screen bg-[#f8f6f0]">
//         <div className="text-gray-600 text-lg">Fetching task details...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen w-full bg-[#f8f6f0] flex items-center justify-center px-4 py-6">
//       <div className="w-full max-w-4xl bg-white shadow-2xl rounded-lg p-10 md:p-16 border border-gray-200 font-serif text-gray-800 leading-relaxed relative">
//         <button
//           onClick={() => router.back()}
//           className="absolute top-6 left-6 text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Back
//         </button>

//         <h1 className="text-3xl font-bold mb-6 border-b pb-2">{task.title}</h1>

//         <div className="space-y-6 text-lg">
//           <p>
//             <span className="font-semibold">Description:</span>{' '}
//             {task.description || 'No description available.'}
//           </p>
//           <p>
//             <span className="font-semibold">Status:</span> {task.status}
//           </p>
//           <p>
//             <span className="font-semibold">Priority:</span> {task.priority}
//           </p>
//           <p>
//             <span className="font-semibold">Completed:</span>{' '}
//             {task.isCompleted ? 'Yes' : 'No'}
//           </p>
//           <p>
//             <span className="font-semibold">Due Date:</span>{' '}
//             {new Date(task.dueDate).toLocaleString()}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import api from '../../lib/api'
import { ArrowLeft } from 'lucide-react'

export default function TaskDetail() {
  const router = useRouter()
  const { id } = useParams()
  const [task, setTask] = useState(null)
  const [recurrence, setRecurrence] = useState(null)

  console.log(task,'task');
  useEffect(() => {
    if (id) {
      api
        .get(`/task/${id}`)
        .then((res) => setTask(res.data))
        .catch((err) => console.error('Error fetching task:', err));
  
      api
        .get(`/recurrence/get/${id}`)
        .then((res) => setRecurrence(res.data))
        .catch((err) => {
          if (err.response && err.response.data?.message === 'Recurrence not found') {
            console.log('No recurrence for this task.');
            setRecurrence(null); // optional, for clarity
          } else {
            console.error('Error fetching recurrence:', err);
          }
        });
    }
  }, [id]);
  
  // useEffect(() => {
  //   if (id) {
  //     api
  //       .get(`/task/${id}`)
  //       .then((res) => setTask(res.data))
  //       .catch((err) => console.error('Error fetching task:', err))

  //     api
  //       .get(`/recurrence/get/${id}`)
  //       .then((res) => setRecurrence(res.data))
  //       .catch((err) => console.error('Error fetching recurrence:', err))
  //   }
  // }, [id])

  if (!task) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#f8f6f0]">
        <div className="text-gray-600 text-lg">Fetching task details...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-[#f8f6f0] flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-lg p-10 md:p-16 border border-gray-200 font-serif text-gray-800 leading-relaxed relative">
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="text-3xl font-bold mb-6 border-b pb-2">{task.title}</h1>

        <div className="space-y-6 text-lg">
          <p>
            <span className="font-semibold">Description:</span>{' '}
            {task.description || 'No description available.'}
          </p>
          <p>
            <span className="font-semibold">Status:</span> {task.status}
          </p>
          <p>
            <span className="font-semibold">Priority:</span> {task.priority}
          </p>
          <p>
            <span className="font-semibold">Completed:</span>{' '}
            {task.isCompleted ? 'Yes' : 'No'}
          </p>
          <p>
            <span className="font-semibold">Due Date:</span>{' '}
            {new Date(task.dueDate).toLocaleString()}
          </p>

          {recurrence && (
            <>
              <hr className="my-4" />
              <h2 className="text-2xl font-bold">Recurrence Info</h2>
              <p>
                <span className="font-semibold">Frequency:</span> {recurrence.frequency}
              </p>
              <p>
                <span className="font-semibold">Interval:</span> {recurrence.interval}
              </p>
              <p>
                <span className="font-semibold">Days of Week:</span>{' '}
                {recurrence.daysOfWeek && recurrence.daysOfWeek.length > 0
                  ? recurrence.daysOfWeek.join(', ')
                  : 'N/A'}
              </p>
              <p>
                <span className="font-semibold">Start Date:</span>{' '}
                {recurrence.startDate ? new Date(recurrence.startDate).toLocaleString() : 'N/A'}
              </p>
              <p>
                <span className="font-semibold">End Date:</span>{' '}
                {recurrence.endDate ? new Date(recurrence.endDate).toLocaleString() : 'N/A'}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
