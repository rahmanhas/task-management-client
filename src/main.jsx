import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import MainLayout from './Layout/MainLayout';
import Home from './Pages/Home';
import Register from './Pages/Register/Register';
import AuthProvider from './AuthProvider/AuthProvider';
import LogIn from './Pages/Login/LogIn';
import AddTask from './Pages/AddTask/AddTask';
import AllTasks from './Pages/AllTasks/AllTasks';
import TaskDetails from './Pages/TaskDetails';
import MAinDashboard from './Pages/Dashboard/MAinDashboard';
import MyTasks from './Pages/My Task/MyTask';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      { path: '/', element: <Home></Home> },
      { path: '/login', element: <LogIn></LogIn> },
      { path: '/register', element: <Register></Register> },
      { path: '/addtask', element: <AddTask></AddTask> },
      { path: '/alltasks', element: <AllTasks></AllTasks> },
      { path: '/mytasks', element: <MyTasks></MyTasks> },
      { path: '/task/:id', element: <TaskDetails></TaskDetails> },
      { path: '/dashboard', element: <MAinDashboard></MAinDashboard> },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
