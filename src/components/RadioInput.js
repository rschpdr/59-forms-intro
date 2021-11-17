function RadioInput(props) {
  return (
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="radio"
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        checked={props.checked}
        required={props.required}
      />
      <label className="form-check-label" htmlFor={props.id}>
        {props.label}
      </label>
    </div>
  );
}

export default RadioInput;
