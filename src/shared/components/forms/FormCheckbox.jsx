import React from 'react';
import { useFormContext } from 'react-hook-form';

const FormCheckbox = ({ 
  name, 
  label,
  ...props 
}) => {
  const { 
    register, 
    formState: { errors } 
  } = useFormContext();
  
  const error = errors[name];

  return (
    <div className="form-group">
      <div className="flex items-center">
        <input
          id={name}
          type="checkbox"
          className={`w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-2 focus:ring-blue-500/20 ${
            error ? 'border-red-500' : ''
          }`}
          {...register(name)}
          {...props}
        />
        {label && (
          <label htmlFor={name} className="ml-2 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
};

export default FormCheckbox;