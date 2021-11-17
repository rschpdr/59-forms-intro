function CheckboxInput(props) {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        type="checkbox"
        name={props.name}
        id={props.id}
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

export default CheckboxInput;
