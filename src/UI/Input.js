import { ErrorMessage, useField } from "formik";
import React from "react";
import "./Input.css";

function Input({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className="divInput">
      <label htmlFor={field.name}>{label}</label>
      <input
        autoComplete="off"
        {...props}
        {...field}
        className={`${meta.touched && meta.error && "is-invalid"}`}
      />
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
}

export default Input;
