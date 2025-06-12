import Link from "next/link";
import React from "react";

type Props = {
  email: string;
  subject: string;
  body: string;
  children: React.ReactNode;
};

const MailTo = ({ email, subject, body, children }: Props) => {
  return (
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={`mailto:${email}?subject=${
        encodeURIComponent(subject) || ""
      }&body=${encodeURIComponent(body) || ""}`}
    >
      {children}
    </Link>
  );
};

export default MailTo;
