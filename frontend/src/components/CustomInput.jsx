// CustomInput.js
import React from "react";
import { useController } from "react-hook-form";

const CustomInput = ({
  label,
  name,
  control,
  type = "text",
  placeholder,
  required = false,
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: required ? `${label} is required` : false, // Show error message if required
    },
  });

  return (
    <div className="custom-input">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        ref={ref}
        style={error ? { border: "1px solid red" } : {}}
      />
      {error && (
        <span className="error" style={{ color: "red" }}>
          {error.message}
        </span>
      )}
    </div>
  );
};

export default CustomInput;
