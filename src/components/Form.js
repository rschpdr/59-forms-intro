import { useState } from "react";
import axios from "axios";

import CheckboxInput from "./CheckboxInput";
import FormField from "./FormField";
import RadioInput from "./RadioInput";
import SelectInput from "./SelectInput";

function Form() {
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
    <form onSubmit={handleSubmit}>
      {/* Input Email */}
      <FormField
        label="Email Address"
        id="exampleInputEmail1"
        type="email"
        name="email" // O atributo name obrigatoriamente precisa ter o mesmo valor que os nome da chave do objeto de state que guarda o valor desse campo
        // As linhas abaixo tornam esse input controlado pelo React, ou seja, sua informação está sempre sincronizada com o state e toda vez que ela muda, o state é atualizado.
        onChange={handleChange}
        value={formData.email}
        required // Torna o preenchimento desse campo obrigatório
      />

      {/* Input senha */}
      <FormField
        label="Password"
        id="exampleInputPassword1"
        type="password"
        name="password"
        onChange={handleChange}
        value={formData.password}
        // Bloqueia a entrega caso a senha não atenda os requisitos mínimos (8 caracteres, conter letra maiúscula e minúscula, conter números e caracteres especiais)
        pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm"
      />

      {/* Input Data Nascimento */}
      <FormField
        label="Date of Birth"
        id="exampleInputDate"
        type="date"
        name="birthDate"
        onChange={handleChange}
        value={new Date(formData.birthDate).toISOString().slice(0, 10)}
      />

      {/* Input Campus */}
      <SelectInput
        label="Campus"
        id="exampleInputCampus"
        name="campus"
        onChange={handleChange}
        value={formData.campus}
      >
        <option value="São Paulo">São Paulo</option>
        <option value="Mexico City">Cidade do México</option>
        <option value="Miami">Miami</option>
      </SelectInput>

      {/* Input Termos e Condições  */}
      <CheckboxInput
        label="I accept the terms and conditions"
        id="exampleInputTerms"
        name="acceptedTerms"
        onChange={(event) =>
          setFormData({
            ...formData,
            [event.target.name]: event.target.checked,
          })
        }
        checked={formData.acceptedTerms}
      />

      {/* Input Bootcamp */}
      <fieldset className="mt-3">
        <legend>Choose your bootcamp:</legend>

        <RadioInput
          label="Web Dev"
          id="exampleInputWebDev"
          name="bootcamp"
          onChange={handleChange}
          value="Web Dev"
          checked={formData.bootcamp === "Web Dev"}
        />

        <RadioInput
          label="UX/UI Design"
          id="exampleInputUX"
          name="bootcamp"
          onChange={handleChange}
          value="UX/UI Design"
          checked={formData.bootcamp === "UX/UI Design"}
        />

        <RadioInput
          label="Data Analytics"
          id="exampleInputData"
          name="bootcamp"
          onChange={handleChange}
          value="Data Analytics"
          checked={formData.bootcamp === "Data Analytics"}
        />

        <RadioInput
          label="Cybersecurity"
          id="exampleInputCybersecurity"
          name="bootcamp"
          onChange={handleChange}
          value="Cybersecurity"
          checked={formData.bootcamp === "Cybersecurity"}
        />
      </fieldset>

      {/* IMPORTANTE: o botão de entrega do formulário precisa estar DENTRO da tag <form> e precisa ter seu atributo 'type' setado para 'submit' */}
      <div className="mt-3 text-end">
        <button disabled={isSending} type="submit" className="btn btn-primary">
          {isSending ? (
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
          ) : null}
          Submit
        </button>
      </div>
    </form>
  );
}

export default Form;
