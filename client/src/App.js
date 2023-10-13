import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from "./components/pages/Admin/Header";
import SideBar from "./components/pages/Admin/SideBar";
import Dashboard from "./components/pages/Admin/body/Dashboard";
import ArchiveList from "./components/pages/Admin/body/ArchiveList";
import StudentList from "./components/pages/Admin/body/StudentList";
import DepartmentList from "./components/pages/Admin/body/DepartmentList";
import CurriculumnList from "./components/pages/Admin/body/CurriculumnList";
import Home from "./components/pages/Home";

function App() {
  return (
    <Router>
      {/* <Header /> */}
      {/* <SideBar /> */}
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        {/* <Route path="/" element={<ArchiveList />} /> */}
        {/* <Route path="/" element={<StudentList />} /> */}
        {/* <Route path="/" element={<DepartmentList />} /> */}
        {/* <Route path="/" element={<CurriculumnList />} /> */}

        {/* Home */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
