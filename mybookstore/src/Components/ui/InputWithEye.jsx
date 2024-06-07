import React, { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

const InputWithEye = ({
  wrapClassName = "",
  className = "",
  name = "",
  placeholder = "",
  label = "",
  onChange,
  disable,
  value,
  ...restProps
}) => {
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    if (onChange) onChange(e.target.value);
  };

  const handleToggle = () => {
    setShow(!show);
  };

  return (
    <div className={`${wrapClassName} rounded-md w-full`}>
      {label && <label>{label}</label>}
      <input
        className={`${className} bg-transparent border-0`}
        type={show ? "text" : "password"}
        name={name}
        value={value}
        disabled={disable}
        onChange={handleChange}
        placeholder={placeholder}
        {...restProps}
      />
      <button type="button" className="mr-3" onClick={handleToggle}>
        {show ? (
          <VscEyeClosed style={{ fontSize: "24px" }} />
        ) : (
          <VscEye style={{ fontSize: "24px" }} />
        )}
      </button>
    </div>
  );
};

export { InputWithEye };
