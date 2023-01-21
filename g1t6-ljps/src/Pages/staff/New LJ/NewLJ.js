import React from 'react';
import { SkillsData } from '../SkillsData';
import { NewLJSkills } from './NewLJSkills';
import { NewLJCourses } from './NewLJCourses';
import { useLocation } from 'react-router-dom';
import { RolesData } from '../RolesData';

export const NewLJ = () => {
  const loc = useLocation().pathname;
  const role_id = loc.slice(loc.lastIndexOf('/') + 1, loc.length);

  let role_name = '';
  for (let role of RolesData) {
    if (String(role['Job_Role_ID']) === role_id) {
      role_name = role['Job_Role_Name'];
    }
  }

  const [page, setPage] = React.useState('skills');
  const [skill, setSkill] = React.useState();

  const handleRouteToCourse = (skillID) => {
    setPage('courses');
    setSkill(skillID);
  };

  const handleRouteToSkills = () => {
    setPage('skills');
  };

  return (
    <>
    <h1>newLJ page</h1>
    <NewLJSkills routeToCourse={handleRouteToCourse} />
      {/* {page === 'skills' && <NewLJSkills routeToCourse={handleRouteToCourse} />}
      {page === 'courses' && (
        <NewLJCourses
          skillID={skill}
          routeToSkills={handleRouteToSkills}
          roleName={role_name}
        />
      )} */}
    </>
  );
};
