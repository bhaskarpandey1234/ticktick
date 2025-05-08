// "use client";
// import TaskItem from './TaskItem'

// export default function TaskList({ tasks }) {
//   return (
//     <ul className="space-y-2">
//       {tasks.map(task => <TaskItem key={task.id} task={task} />)}
//     </ul>
//   )
// }

// "use client";

// import TaskItem from './TaskItem';

// export default function TaskList({ tasks }) {
//   if (!tasks || tasks.length === 0) {
//     return (
//       <div className="text-center text-gray-500 mt-8">
//         <p>No tasks available. Click <span className="text-blue-600 font-medium">+</span> to add one!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="mt-6 bg-white p-4 rounded-lg shadow space-y-3 animate-fade-in">
//       {tasks.map((task) => (
//         <div
//           key={task.id}
//           className="transition-transform transform hover:scale-[1.01] hover:shadow-md rounded-md border border-gray-200 p-3"
//         >
//           <TaskItem task={task} />
//         </div>
//       ))}
//     </div>
//   );
// }

'use client';

import TaskItem from './TaskItem';

export default function TaskList({ tasks }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">
        <p>
          No tasks available. Click{' '}
          <span className="text-blue-600 font-medium">+</span> to add one!
        </p>
      </div>
    );
  }

  // return (
  //   <>
  //   <div className="hidden md:block mt-6 overflow-x-auto bg-white p-4 rounded-lg shadow animate-fade-in">
  //     <table className="w-full table-auto text-sm border-collapse ">
  //       <thead className="bg-gray-100 border-b">
  //         <tr className="text-gray-700 text-left">
  //           <th className="p-2">Title</th>
  //           <th className="p-2">Description</th>
  //           <th className="p-2">Status</th>
  //           <th className='p-2'>Priority</th>
  //           <th className='p-2'>Day, Date, Time</th>
  //           <th className="p-2 text-right">Actions</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {tasks.map((task) => (
  //           <TaskItem key={task.id} task={task} />
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
     
  //  </>
  // );
  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block mt-6 overflow-x-auto bg-white p-4 rounded-lg shadow animate-fade-in">
        <table className="w-full table-auto text-sm border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr className="text-gray-700 text-left">
              <th className="p-2">Title</th>
              <th className="p-2">Description</th>
              <th className="p-2">Status</th>
              <th className="p-2">Priority</th>
              <th className="p-2">Day, Date, Time</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} view="table" />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4 mt-6">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} view="card" />
        ))}
      </div>
    </>
  );
}
