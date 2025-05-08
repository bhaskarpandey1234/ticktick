// // app/recurrence/[taskId]/page.js
// 'use client';

// import { useParams, useRouter } from 'next/navigation';
// import RecurrenceForm from '../../components/RecurrenceForm';

// export default function RecurrencePage() {
//   const { taskId } = useParams();
//   const router = useRouter();

//   return (
//     <div className="min-h-screen p-6 bg-gray-100">
//       <header className="flex justify-between items-center mb-4">
//         <h1 className="text-2xl font-bold">Set Recurrence</h1>
//         <button
//           onClick={() => router.back()}
//           className="px-3 py-1 bg-gray-300 rounded"
//         >
//           ← Back
//         </button>
//       </header>

//       {/* Render your existing form */}
//       <RecurrenceForm taskId={taskId} />
//     </div>
//   );
// }
'use client';

import { useParams, useRouter } from 'next/navigation';
import RecurrenceForm from '../../components/RecurrenceForm';

export default function RecurrencePage() {
  const { taskId } = useParams();
  const router = useRouter();

  const closeModal = () => router.back();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fadeIn">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Set Task Recurrence</h2>
        <RecurrenceForm taskId={taskId} closeModal={closeModal} />
      </div>
    </div>
  );
}
