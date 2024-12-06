import React from "react";
import { useController } from "react-hook-form";

const CustomInput = ({
  label,
  name,
  control,
  type = "text",
  placeholder,
  required = false,
  defaultValue = "", // Add defaultValue prop
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue, // Set defaultValue here
    rules: {
      required: required ? `${label} is required` : false,
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
