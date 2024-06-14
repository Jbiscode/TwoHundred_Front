import '@styles/common/index.scss'
import './App.css'
import {RouterProvider} from "react-router-dom";
import root from "@router/root.jsx";
import authStore from "@zustand/authStore";
import useSocketStore from "@zustand/useSocketStore";
import { useEffect } from "react";


function App() {
  const { id } = authStore();
  const { initializeSocket, closeSocket} = useSocketStore();

  // useEffect(() => {
  //     if (id !== null) {
  //     initializeSocket(id);
  //     } else {
  //     closeSocket();
  //     }
  // }, [id, initializeSocket, closeSocket]);
  return (
    <>
      <RouterProvider router={root}/>
    </>
  );
}

export default App;
