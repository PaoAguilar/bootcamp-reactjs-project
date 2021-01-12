import app from "./../firebase";
const db = app.firestore();

export const getEmployees = async () => {
  const docs = await db.collection("employees").get();
  const employees = [];
  docs.forEach((doc) => {
    // console.log(doc.data());
    employees.push({ ...doc.data(), id: doc.id });
  });
  return employees;
};

export const deleteEmployees = async (id) => {
  try {
    db.collection("employees").doc(id).delete();
  } catch (error) {
    console.log(error);
  }
};

export const getInabilities = async () => {
  const docs = await db.collection("inability").get();
  const inability = [];
  docs.forEach((doc) => {
    inability.push({ ...doc.data(), id: doc.id });
  });
  return inability;
};

export const deleteInabilities = async (id) => {
  try {
    db.collection("inability").doc(id).delete();
  } catch (error) {
    console.log(error);
  }
};
