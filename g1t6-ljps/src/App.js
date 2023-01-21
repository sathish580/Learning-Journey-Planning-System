import logo from './logo.svg';
import './App.css';
// import NavBar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Switch } from "react-router-dom";
import Staff from './Pages/staff';
import HR from './Pages/HR';
import Manager from './Pages/manager';

import Login from './Login';
import Learner from './Pages/staff';
import IndivLearningJourney from './Pages/staff/Learning Journey/IndivLearningJourney';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/learner' element={<Learner />} />
        <Route path='/learner/:Role_ID' element={<Learner />} />

        <Route path='/learner/roles' element={<Learner />} />
        <Route path='/learner/roles/:Role_ID' element={<Learner />} />
        <Route path='/learner/roles/individual_role/individual_skill' element={<Learner />} />

        <Route path='/learner/courses' element={<Learner />} />
        <Route path='/learner/courses/:Course_ID' element={<Learner />} />

        <Route path='/learner/new_lj' element={<Learner />} />
        <Route path='/learner/new_lj/:Role_ID' element={<Learner />} />
        <Route path='/learner/new_lj/:Role_ID/:Skill_ID' element={<Learner />} />
        <Route path='/learner/new_lj/lj_skills/lj_courses' element={<Learner />} />

        <Route path='/manager' element={<Manager />} />
        <Route path='/manager/:staffId' element={<Manager />} />

        <Route path='/hr' element={<HR />} />
        <Route path='/hr/roles' element={<HR />} />
        <Route path='/hr/roles/create' element={<HR />} />
        <Route path='/hr/roles/:roleId' element={<HR />} />
        <Route path='/hr/skills' element={<HR />} />
        <Route path='/hr/skills/create' element={<HR />} />
        <Route path='/hr/skills/:Skill_ID' element={<HR />} />


      </Routes>
    </>
  );
}

export default App;
