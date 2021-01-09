import app from "./../firebase";
const db = app.firestore();

export const getEmployees = async () => {
  // querySnapshot is the responds that gives firebase
  const docs = await db.collection("employees").get();
  const employees = [];
  docs.forEach((doc) => {
    console.log(doc.data());
    employees.push({ ...doc.data(), id: doc.id });
  });
  return employees;
};
