import '@styles/common/index.scss'
import './App.css'
import {RouterProvider} from "react-router-dom";
import root from "@router/root.jsx";
import ParentModal from './components/templates/ParentModal';

function App() {
  return (
    <>
    <RouterProvider router={root}/>
    <ParentModal/>
    </>
  );
}

export default App;
