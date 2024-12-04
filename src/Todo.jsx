import React, { useState } from 'react';

function Todo({ children, isChecked, setIsChecked }) {
  const handleChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
      <label className="ml-2 text-lg">{children}</label>
    </div>
  );
}

export default Todo;