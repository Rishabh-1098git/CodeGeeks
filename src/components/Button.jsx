import React from "react";

function Button({ onClick, disabled, text }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="h-10 w-40 
      rounded-3xl bg-yellow-500 font-mono font-bold border-2 border-black hover:bg-yellow-600 shadow-lg "
    >
      {text}
    </button>
  );
}

export default Button;
