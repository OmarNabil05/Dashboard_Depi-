import './App.css'
import MainLayout from './pages/MainLayout'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StatisticsPage from './pages/StatisticsPage';
import Log from './pages/Log';
import Tables from './pages/Tables';
import Requests from './pages/Requests';
import { Menu } from 'lucide-react';
import MenuPage from './pages/Menu';


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children:
      [
        {
          path: '/Stat'
          , element: <StatisticsPage />
        },
        {
          path: '/menu'
          , element: <MenuPage />
        },
        {
          path: '/Log'
          , element: <Log />
        },
        {
          path: '/Tables'
          , element: <Tables />
        },
        {
          path: '/Requests'
          , element: <Requests />
        },
        
      ]
  }
])

function App() {

  return (
    <>
       <RouterProvider router={router} />
       {/* <MainLayout/> */}
    </>
  )
}

export default App
