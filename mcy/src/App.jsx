import Main from "./pages/Main";
import BirthDay from "./pages/BirthDay";
import Attendance from "./pages/Attendance";
import News from "./pages/News";
import ReaderAdmin from "./pages/ReaderAdmin.jsx";
import MemberAdmin from "./pages/MemberAdmin.jsx";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/birthDay" element={<BirthDay />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/news" element={<News />} />
        <Route path="/readerAdmin" element={<ReaderAdmin />} />
        <Route path="/memberAdmin" element={<MemberAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
