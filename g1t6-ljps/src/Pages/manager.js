import React from "react";
import StaffNavbar from "../Components/StaffNavbar";
import BodyElement from '../Components/BodyElement';

const Manager = () => {
  return (
    <>
    <StaffNavbar bodyElement={<BodyElement />}/>
    </>
  );
};
  
export default Manager;