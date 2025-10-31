import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Portfolio from './pages/Portfolio/Portfolio.jsx';
import Blogs from './pages/Blogs/Blogs.jsx';
import Resume from './pages/Resume/Resume.jsx';
import About from './pages/About/About.jsx';
import Contact from './pages/Contact/Contact.jsx';
import { ThemeProvider } from './contexts/ThemeContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <About/>,
      },
      {
        path: "/resume",
        element: <Resume/>,
      },
      {
        path: "/portfolio",
        element: <Portfolio/>,
      },
      {
        path: "blogs",
        element: <Blogs/>
      },
      {
        path: "contact",
        element: <Contact/>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
)
