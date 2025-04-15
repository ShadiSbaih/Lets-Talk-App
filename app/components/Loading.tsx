// components/Loading.tsx
import React from 'react';
import { Commet } from 'react-loading-indicators';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-[200px] w-full">
      <Commet color="#32cd32" size="medium" text="" textColor="" />
    </div>
  );
};

export default Loading;