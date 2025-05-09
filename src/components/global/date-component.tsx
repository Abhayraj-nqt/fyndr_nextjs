import { format as formatFns, parseISO } from "date-fns";

type DateFormat =
  | "MM/dd/yyyy"
  | "dd/MM/yyyy"
  | "MM-dd-yyyy"
  | "dd-MM-yyyy"
  | "MMM dd, yyyy";

type DateProps = {
  date: string | Date;
  className?: string;
  format?: DateFormat;
  timeZone?: string;
};

const DateComponent = ({
  date,
  className = "",
  format = "MM-dd-yyyy",
  timeZone,
}: DateProps) => {
  const parsedDate = date instanceof Date ? date : parseISO(date);

  const isValid = !isNaN(parsedDate.getTime());

  const formattedDate = isValid
    ? // ? formatFns(parsedDate, format, timeZone ? { timeZone } : undefined)
      formatFns(parsedDate, format)
    : "Invalid date";

  return (
    <time
      dateTime={isValid ? parsedDate.toISOString() : undefined}
      className={className}
    >
      {formattedDate}
    </time>
  );
};

export default DateComponent;
