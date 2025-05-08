// "use client";
// import { createContext, useContext, useReducer, useEffect } from 'react'
// import axios from 'axios'

// axios.defaults.baseURL = "http://loacalhost:3000";
// const TaskContext = createContext()

// const initialState = { tasks: [] }

// function taskReducer(state, action) {
//   switch (action.type) {
//     case 'SET_TASKS': return { ...state, tasks: action.payload }
//     case 'ADD_TASK': return { ...state, tasks: [...state.tasks, action.payload] }
//     case 'UPDATE_TASK': return { ...state, tasks: state.tasks.map(t => t.id === action.payload.id ? action.payload : t) }
//     case 'DELETE_TASK': return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) }
//     default: return state
//   }
// }

// export function TaskProvider({ children }) {
//   const [state, dispatch] = useReducer(taskReducer, initialState)

//   useEffect(() => {
//     async function fetchTasks() {
//       const res = await axios.get('/api/task/get')
//       dispatch({ type: 'SET_TASKS', payload: res.data })
//     }
//     fetchTasks()
//   }, [])

//   const value = { state, dispatch }
//   return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
// }

// export function useTasks() {
//   return useContext(TaskContext)
// }

"use client";

import { createContext, useContext, useReducer, useEffect } from 'react';
import api from '../lib/api';

const TaskContext = createContext();
const initialState = { tasks: [] };

function taskReducer(state, action) {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(t => t.id !== action.payload),
      };
    default:
      return state;
  }
}

export function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const a="";

  useEffect(() => {
    const token=localStorage.getItem('token');
    if(token){
      api.get('/task/get').then(res =>
        dispatch({ type: 'SET_TASKS', payload: res.data })
      );
    }
  },[]);

  return (
    <TaskContext.Provider value={{ state, dispatch, a}}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  return useContext(TaskContext);
}
