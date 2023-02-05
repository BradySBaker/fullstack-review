import React, { useState } from 'react';

const Clear = ({onClear}) => {

  return (
    <div className="clear">
      <button onClick={onClear}> Clear Page </button>
    </div>
  );
}

export default Clear;