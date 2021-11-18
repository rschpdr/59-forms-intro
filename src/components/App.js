import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Form from "./Form";
import StudentList from "./StudentList";
import UpdateStudent from "./UpdateStudent";

function App() {
  return (
    <div className="container mt-5">
      <Routes>
        <Route path="/" element={<StudentList />} />
        <Route path="/new-student" element={<Form />} />
        <Route path="/update-student/:id" element={<UpdateStudent />} />
      </Routes>
    </div>
  );
}

export default App;
