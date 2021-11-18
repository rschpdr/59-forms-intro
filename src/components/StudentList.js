import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function StudentList() {
  // 1. O state inicial é uma array vazia que vai ser preenchida depois com as informações que chegarem da API
  const [students, setStudents] = useState([]);

  // 2. Disparando a requisição HTTP para buscar todos os alunos na API
  useEffect(() => {
    axios
      .get("https://ironrest.herokuapp.com/classroom")
      .then((response) => {
        // 3. Preencher o state com a resposta da API (lista de alunos)

        // O objeto response é definido pelo Axios e sempre tem o mesmo formato. Os dados respondidos pela API sempre estarão na chave 'data'

        setStudents([...response.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th>Email</th>
            <th>Campus</th>
            <th>Bootcamp</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* 4. Usar o state preenchido para renderizar uma linha da tabela por aluno na array */}
        <tbody>
          {students.map((currentStudentObj) => (
            <tr key={currentStudentObj._id}>
              <td>{currentStudentObj.email}</td>
              <td>{currentStudentObj.campus}</td>
              <td>{currentStudentObj.bootcamp}</td>
              <td>
                <Link to={`/update-student/${currentStudentObj._id}`}>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentList;
