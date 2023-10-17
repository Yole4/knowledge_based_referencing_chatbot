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
import Undefine from "./components/pages/404/Undefine";

// universal page
import Projects from "./components/pages/universal page/Projects";
import Welcome from "./components/pages/universal page/Welcome";
import AboutUs from "./components/pages/universal page/AboutUs";
import SubmitProject from "./components/pages/universal page/SubmitProject";

// chatbot
import Chatbot from "./components/pages/chatbot/Chatbot";

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();
  // const isLogin = location.pathname === '/';
  const isUniversal = location.pathname === '/' || location.pathname === '/projects' || location.pathname === '/about-us' || location.pathname === '/submit-project';
  const isAdmin = location.pathname === '/dashboard' || location.pathname === '/archive-list' || location.pathname === '/student-list' || location.pathname === '/users-list' || location.pathname === '/department-list' || location.pathname === "/settings" || location.pathname === '/curriculumn-list';

  return (
    <>
      {isAdmin && (
        <>
          <Header />
          <SideBar />
          <Chatbot />
        </>
      )}
      {isUniversal && (
        <>
          {/* Home */}
          <Home />
          <Chatbot />
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
        <Route path="/" element={<Welcome />} />
        <Route path="/projects" element={<Projects />} /> 
        <Route path="/about-us" element={<AboutUs />} /> 
        <Route path="/submit-project" element={<SubmitProject />} /> 

        {/* Chatbot */}
        {/* <Route path="/tcas-chatbot" element={<Chatbot />} />  */}

        {/* ------ undefine URL -------- */}
        <Route path='*' element={<Undefine />} />
      </Routes>
    </>
  );
}

export default App;
