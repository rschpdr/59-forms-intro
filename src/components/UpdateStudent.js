import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Form from "./Form";

function UpdateStudent() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    birthDate: "11/01/1965",
    campus: "São Paulo",
    acceptedTerms: false,
    bootcamp: "Web Dev",
  });
  const [isSending, setIsSending] = useState(false);

  // Lembrando que 'id' é o nome do parâmetro definido depois dos ":" na linha 14 do arquivo App.js
  const { id } = useParams(); // 1. Extrai o id desse documento da URL do navegador

  // navigate é uma função que redireciona o usuário para outra página
  const navigate = useNavigate();

  // 2. Assim que a página carrega, dispara a requisição HTTP
  useEffect(() => {
    axios
      .get(`https://ironrest.herokuapp.com/classroom/${id}`) // OBS.: concatenamos o id no endpoint da API para filtrar somente o documento do aluno atual
      .then((response) => {
        // 3. Quando a API responde, atualizamos o nosso state com os dados

        delete response.data._id; // Precisamos deletar a chave _id do objeto respondido pela API, pois a API não deixa atualizar objetos que contenham essa chave

        setFormData({ ...response.data });
      })
      .catch((err) => console.log(err));
  }, [id]);

  function handleChange(event) {
    // ATENÇÃO: a função de atualização de state é DESTRUTIVA, ou seja, ela substitui o state anterior pelo novo. Quando o state é um objeto, se não quisermos perder as chaves anteriores em uma atualização, precisamos salvar todas as chaves existentes usando a sintaxe de espalhamento (...)
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.acceptedTerms) {
      alert("You need to accept the terms and conditions");
      return;
    }

    setIsSending(true);

    axios
      .put(`https://ironrest.herokuapp.com/classroom/${id}`, formData) // OBS.: A única diferença da atualização para a criação é o método HTTP (PUT) e o fato que precisamos dizer QUAL documento vai ser atualizado através do id
      .then((response) => {
        setIsSending(false);
        alert("Successfully updated!");
        navigate("/"); // Redireciona o usuário de volta pra home
      })
      .catch((err) => {
        console.log(err);
        setIsSending(false);
      });
  }

  return (
    <Form
      handleChange={handleChange}
      formData={formData}
      setFormData={setFormData}
      isSending={isSending}
      handleSubmit={handleSubmit}
    />
  );
}

export default UpdateStudent;
