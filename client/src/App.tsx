import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Landing } from "./pages/Landing"
import { Create } from "./pages/Create"
import { Join } from "./pages/Join"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="/join" element={<Join/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
