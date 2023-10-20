import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from "./components/pages/Admin/body/Dashboard";
import ArchiveList from "./components/pages/Admin/body/ArchiveList";
import StudentList from "./components/pages/Admin/body/StudentList";
import DepartmentList from "./components/pages/Admin/body/DepartmentList";
import CurriculumnList from "./components/pages/Admin/body/CurriculumnList";
import UsersList from "./components/pages/Admin/body/UsersList";
import Settings from "./components/pages/Admin/body/Settings";
import Undefine from "./components/pages/404/Undefine";
import SchoolYear from "./components/pages/Admin/body/SchoolYear";

// universal page
import Projects from "./components/pages/universal page/Projects";
import Welcome from "./components/pages/universal page/Welcome";
import AboutUs from "./components/pages/universal page/AboutUs";
import SubmitProject from "./components/pages/Admin/body/SubmitProject";
import ViewProject from "./components/pages/universal page/ViewProject";

// protected
import ProtectedRoute from "./auth/ProtectedRoute";
import { Auth } from "./auth/Auth";

console.log(ProtectedRoute);
function App() {
  return (
    <>
      <Auth>
        <Router>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/archive-list" element={<ArchiveList />} />
            <Route path="/student-list" element={<StudentList />} />
            <Route path="/department-list" element={<DepartmentList />} />
            <Route path="/curriculumn-list" element={<CurriculumnList />} />
            <Route path="/users-list" element={<UsersList />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/school-year" element={<SchoolYear />} />

            {/* Home */}
            <Route path="/" element={<Welcome />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/submit-project" element={<SubmitProject />} />
            <Route path="/view-project/:id" element={<ViewProject />} />

            {/* Chatbot */}
            {/* <Route path="/tcas-chatbot" element={<Chatbot />} />  */}

            {/* ------ undefine URL -------- */}
            <Route path='*' element={<Undefine />} />
          </Routes>
        </Router>
      </Auth>
    </>
  );
}

export default App;
