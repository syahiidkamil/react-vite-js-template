import React from 'react';
import { useFormContext } from 'react-hook-form';

const FormSelect = ({ 
  name, 
  label, 
  options, 
  placeholder = 'Select an option',
  ...props 
}) => {
  const { 
    register, 
    formState: { errors } 
  } = useFormContext();
  
  const error = errors[name];

  return (
    <div className="form-group">
      {label && (
        <label className="form-label" htmlFor={name}>
          {label}
        </label>
      )}
      <select
        id={name}
        className={`form-input ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}`}
        {...register(name)}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
};

export default FormSelect;