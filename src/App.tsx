/* import { useState, useEffect} from 'react' */
import Home from "./Home.tsx"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const App = () => {
  return (
    <>
      <ToastContainer />
      <Home />
    </>
    
  )
}

export default App
