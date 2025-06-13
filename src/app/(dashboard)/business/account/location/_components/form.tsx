import React from "react";
interface FormProps {
  isActive: boolean;
  onCancel: () => void;
}
const Form = ({ isActive, onCancel }: FormProps) => {
  return (
    <div className="mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-medium text-blue-500">Location Details</h1>
        <button
          onClick={onCancel}
          className="rounded-lg bg-blue-500 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>

      <div></div>
    </div>
  );
};

export default Form;
