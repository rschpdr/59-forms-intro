import { useState } from "react";
import axios from "axios";

import Form from "./Form";

function CreateStudent() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    birthDate: "11/01/1965",
    campus: "São Paulo",
    acceptedTerms: false,
    bootcamp: "Web Dev",
  });
  const [isSending, setIsSending] = useState(false);

  // {} => chave (curly bracket)
  // [] => colchete (square bracket)

  function handleChange(event) {
    // ATENÇÃO: a função de atualização de state é DESTRUTIVA, ou seja, ela substitui o state anterior pelo novo. Quando o state é um objeto, se não quisermos perder as chaves anteriores em uma atualização, precisamos salvar todas as chaves existentes usando a sintaxe de espalhamento (...)
    setFormData({ ...formData, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    // Impedir o comportamento padrão do formulário de enviar os dados pela URL
    event.preventDefault();

    // Não deixa entregar o formulário se os termos e condições não foram aceitos

    if (!formData.acceptedTerms) {
      alert("You need to accept the terms and conditions");
      return;
    }

    // Coloca o estado do formulário como "enviando"
    setIsSending(true);

    // Entregar os dados armazenados no state para nossa API disparando uma requisição HTTP do tipo POST

    // O método post do Axios recebe 2 argumentos: primeiro a URL da API, segundo o objeto contendo as informações que queremos enviar
    axios
      .post("https://ironrest.herokuapp.com/classroom", formData)
      .then((response) => {
        console.log(response);
        // Tira o estado de "enviando"
        setIsSending(false);
      })
      .catch((err) => {
        console.log(err);
        setIsSending(false);
      });
  }

  return (
    <Form
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      formData={formData}
      setFormData={setFormData}
      isSending={isSending}
    />
  );
}

export default CreateStudent;
