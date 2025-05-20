import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
};

const AuthContainerWrapper = ({ children, title, description }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 text-light-900">
      <div className="mb-8 text-center">
        <h1 className="h1-bold text-white">{title}</h1>
        <p className="paragraph-regular mt-2 text-gray-200">{description}</p>
      </div>

      {children}
    </div>
  );
};

export default AuthContainerWrapper;
