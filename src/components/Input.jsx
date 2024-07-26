import React from "react";

function Input({ type, label, value, onChange }) {
  return (
    <div className="m-5 w-full">
      <label className="block text-md font-medium text-gray-300 font-mono">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-black-bg text-gray-300 font-mono"
      />
    </div>
  );
}

export default Input;
