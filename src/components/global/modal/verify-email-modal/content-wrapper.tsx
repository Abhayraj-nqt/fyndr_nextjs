import React from "react";

type Props = {
  note?: string;
  inputSection: React.ReactNode;
  buttonSection: React.ReactNode;
};

const ContentWrapper = ({ note, inputSection, buttonSection }: Props) => {
  return (
    <div className="flex flex-col gap-6 p-2">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">{inputSection}</div>
        {note && <p className="body-3 text-black-50">{note}</p>}
      </div>
      <div className="flex-center gap-2">{buttonSection}</div>
    </div>
  );
};

export default ContentWrapper;
