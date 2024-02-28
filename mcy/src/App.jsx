import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./pages/Main";
import BirthDay from "./pages/BirthDay";
import Attendance from "./pages/Attendance";
import News from "./pages/News";
import ReaderAdmin from "./pages/ReaderAdmin.jsx";
import MemberAdmin from "./pages/MemberAdmin.jsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/birthDay" element={<BirthDay />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/news" element={<News />} />
        {/* 셀 관리 페이지 */}
        <Route path="/reader-admin" element={<ReaderAdmin />} />
        {/* 셀원 관리 페이지 */}
        <Route path="/member-admin" element={<MemberAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
