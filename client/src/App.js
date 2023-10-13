import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from "./components/pages/Admin/Header";
import SideBar from "./components/pages/Admin/SideBar";
import Dashboard from "./components/pages/Admin/body/Dashboard";
import ArchiveList from "./components/pages/Admin/body/ArchiveList";
import StudentList from "./components/pages/Admin/body/StudentList";
import DepartmentList from "./components/pages/Admin/body/DepartmentList";
import CurriculumnList from "./components/pages/Admin/body/CurriculumnList";
import Home from "./components/pages/Home";
import UsersList from "./components/pages/Admin/body/UsersList";
import Settings from "./components/pages/Admin/body/Settings";

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();
  const isLogin = location.pathname === '/';
  const isAdmin = location.pathname === '/dashboard' || location.pathname === '/archive-list' || location.pathname === '/student-list' || location.pathname === '/department-list' || location.pathname === '/curriculumn-list';

  return (
    <>
      {!isLogin && (
        <>
          <Header />
          <SideBar />
        </>
      )}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/archive-list" element={<ArchiveList />} />
        <Route path="/student-list" element={<StudentList />} />
        <Route path="/department-list" element={<DepartmentList />} />
        <Route path="/curriculumn-list" element={<CurriculumnList />} />
        <Route path="/users-list" element={<UsersList />} />
        <Route path="/settings" element={<Settings />} />

        {/* Home */}
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
