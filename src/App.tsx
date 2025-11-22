import './App.css'
import MainLayout from './pages/mainlayout'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StatisticsPage from './pages/StatisticsPage';
import Log from './pages/Log';
import Tables from './pages/Tables';
import Requests from './pages/Requests';
import Menu from './pages/Menu';


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
        {
          path: '/Menu'
          , element: <Menu />
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
