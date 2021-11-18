import CheckboxInput from "./CheckboxInput";
import FormField from "./FormField";
import RadioInput from "./RadioInput";
import SelectInput from "./SelectInput";

function Form(props) {
  return (
    <form onSubmit={props.handleSubmit}>
      {/* Input Email */}
      <FormField
        label="Email Address"
        id="exampleInputEmail1"
        type="email"
        name="email" // O atributo name obrigatoriamente precisa ter o mesmo valor que os nome da chave do objeto de state que guarda o valor desse campo
        // As linhas abaixo tornam esse input controlado pelo React, ou seja, sua informação está sempre sincronizada com o state e toda vez que ela muda, o state é atualizado.
        onChange={props.handleChange}
        value={props.formData.email}
        required // Torna o preenchimento desse campo obrigatório
      />

      {/* Input senha */}
      <FormField
        label="Password"
        id="exampleInputPassword1"
        type="password"
        name="password"
        onChange={props.handleChange}
        value={props.formData.password}
        // Bloqueia a entrega caso a senha não atenda os requisitos mínimos (8 caracteres, conter letra maiúscula e minúscula, conter números e caracteres especiais)
        pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
      />

      {/* Input Data Nascimento */}
      <FormField
        label="Date of Birth"
        id="exampleInputDate"
        type="date"
        name="birthDate"
        onChange={props.handleChange}
        value={new Date(props.formData.birthDate).toISOString().slice(0, 10)}
      />

      {/* Input Campus */}
      <SelectInput
        label="Campus"
        id="exampleInputCampus"
        name="campus"
        onChange={props.handleChange}
        value={props.formData.campus}
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
          props.setFormData({
            ...props.formData,
            [event.target.name]: event.target.checked,
          })
        }
        checked={props.formData.acceptedTerms}
      />

      {/* Input Bootcamp */}
      <fieldset className="mt-3">
        <legend>Choose your bootcamp:</legend>

        <RadioInput
          label="Web Dev"
          id="exampleInputWebDev"
          name="bootcamp"
          onChange={props.handleChange}
          value="Web Dev"
          checked={props.formData.bootcamp === "Web Dev"}
        />

        <RadioInput
          label="UX/UI Design"
          id="exampleInputUX"
          name="bootcamp"
          onChange={props.handleChange}
          value="UX/UI Design"
          checked={props.formData.bootcamp === "UX/UI Design"}
        />

        <RadioInput
          label="Data Analytics"
          id="exampleInputData"
          name="bootcamp"
          onChange={props.handleChange}
          value="Data Analytics"
          checked={props.formData.bootcamp === "Data Analytics"}
        />

        <RadioInput
          label="Cybersecurity"
          id="exampleInputCybersecurity"
          name="bootcamp"
          onChange={props.handleChange}
          value="Cybersecurity"
          checked={props.formData.bootcamp === "Cybersecurity"}
        />
      </fieldset>

      {/* IMPORTANTE: o botão de entrega do formulário precisa estar DENTRO da tag <form> e precisa ter seu atributo 'type' setado para 'submit' */}
      <div className="mt-3 text-end">
        <button
          disabled={props.isSending}
          type="submit"
          className="btn btn-primary"
        >
          {props.isSending ? (
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
