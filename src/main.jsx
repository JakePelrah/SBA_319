import { createRoot } from 'react-dom/client'
import Account from './components/Account.jsx';
import Navbar from './components/Navbar.jsx';
import User from './components/User.jsx';
import App from './App.jsx'

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
    <RouterProvider router={router} />
)
