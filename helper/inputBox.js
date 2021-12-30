const Input = ({ values, name, label, type, handler }) => {
  return (
    <div className="form-group mr-3">
      <label htmlFor={label}>
        <h6>{label}</h6>
      </label>
      <input
        type={type}
        name={name}
        className="form-control col-12"
        value={values[name]}
        onChange={(e) => handler(e)}
      />
      <p style={{ fontSize: '12px', fontWeight: '600' }}>
        Min 5,000 To Max 50000
      </p>
    </div>
  );
};

export default Input;
