import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './Navbar.jsx';
import App from './App.jsx'
import User from './User.jsx';
import Account from './Account.jsx';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: 'user/:id',
        element: <User />
      },
      {
        path: 'account/:userId/:accountId',
        element: <Account />
      }
    ]
  },

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
