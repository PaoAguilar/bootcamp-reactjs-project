import React from "react";
import app from "./../firebase";
import Employee from "./employee/Employee";

const db = app.firestore();

const Home = () => {
  const addOrEdit = async (employeeObject) => {
    //we can see in this employeeObject, all the data that comes from Employee component
    console.log(employeeObject);
    //we can add a collection on firestore call employees, and add the data
    await db.collection("employees").doc().set(employeeObject);
    console.log("nueva tarea agregada");
  };

  return (
    <>
      <button onClick={() => app.auth().signOut()}>Sign Out</button>
      <Employee addOrEdit={addOrEdit} />
    </>
  );
};

export default Home;
