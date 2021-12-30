const RadioButton = ({ values, name, label, options, handler }) => {
  return (
    <div className="form-group">
      <div>
        <label htmlFor={name}>
          <h6>{label}</h6>
        </label>
      </div>
      <div className="d-flex justify-content-start">
        {options.map((obj, index) => {
          return (
            <div style={{ marginRight: '50px' }}>
              <input
                className="form-check-input"
                type="radio"
                name={name}
                onChange={(e) => handler(e)}
                checked={obj.displayValue === values[name]}
                value={obj.displayValue}
              />
              &nbsp;
              <label htmlFor={name}>
                <h6>{obj.displayName}</h6>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RadioButton;
