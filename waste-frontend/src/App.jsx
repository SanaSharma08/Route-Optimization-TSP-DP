import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import './App.css';
import Simulator from './components/Simulator.jsx';
import Home from './components/Home.jsx';
import ScrollToTop from './components/ScrollToTop.jsx'; // Import your component
import Navbar from './components/Navbar.jsx';
// 1. Create a Layout component to wrap your pages
const RootLayout = () => {
  return (
    <ScrollToTop>
      <Navbar />
      <main>
        <Outlet /> {/* This is where the Home, About, etc. will render */}
      </main>
    </ScrollToTop>
  );
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />, // Use the layout here
      children: [
        { path: "/", element: <Home /> },
        { path: "/simulate", element: <Simulator /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;