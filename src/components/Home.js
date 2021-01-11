import React from "react";
import app from "./../firebase";
import Employee from "./employee/Employee";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const db = app.firestore();

const Home = () => {
  const addOrEdit = async (employeeObject) => {
    //we can see in this employeeObject, all the data that comes from Employee component
    console.log(employeeObject);
    //we can add a collection on firestore call employees, and add the data
    await db.collection("employees").doc().set(employeeObject);
    toast.success("New Employee added");
  };

  return (
    <>
      <button onClick={() => app.auth().signOut()}>Sign Out</button>
      <Employee addOrEdit={addOrEdit} />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default Home;
