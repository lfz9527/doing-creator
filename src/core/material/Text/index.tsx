import React from 'react';

const Text: React.FC<{ value: string | number }> = ({ value }) => {
  return <div>{value}</div>;
};

export default Text;
