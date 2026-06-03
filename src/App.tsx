import "./index.css"
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login, Main, BirthDay, AttendanceCheck, AttendanceStatus, CellManagement } from "./pages/index"
import PAGE_PATH from "./constants/path"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PAGE_PATH.MAIN} element={<Main />} />
        <Route path={PAGE_PATH.LOGIN} element={<Login />} />
        <Route path={PAGE_PATH.BIRTHDAY} element={<BirthDay />} />
        <Route path={PAGE_PATH.ATTENDANCE_CHECK} element={<AttendanceCheck />} />
        <Route path={PAGE_PATH.ATTENDANCE_STATUS} element={<AttendanceStatus />} />
        <Route path={PAGE_PATH.CELL_MANAGEMENT} element={<CellManagement />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
