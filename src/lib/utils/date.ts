type DateInput = Date | string | number;
type TimeUnit =
  | "days"
  | "day"
  | "weeks"
  | "week"
  | "months"
  | "month"
  | "years"
  | "year"
  | "hours"
  | "hour"
  | "minutes"
  | "minute"
  | "seconds"
  | "second";

export const getTimeStamp = (createdAt: Date) => {
  const date = new Date(createdAt);
  const now = new Date();

  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);
  const units = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];
  for (const unit of units) {
    const interval = Math.floor(secondsAgo / unit.seconds);
    if (interval >= 1) {
      return `${interval} ${unit.label}${interval > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
};

export function addDays(date: DateInput, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function addToDate(
  date: DateInput,
  amount: number,
  unit: TimeUnit = "days"
): Date {
  const result = new Date(date);

  switch (unit.toLowerCase() as TimeUnit) {
    case "days":
    case "day":
      result.setDate(result.getDate() + amount);
      break;
    case "weeks":
    case "week":
      result.setDate(result.getDate() + amount * 7);
      break;
    case "months":
    case "month":
      result.setMonth(result.getMonth() + amount);
      break;
    case "years":
    case "year":
      result.setFullYear(result.getFullYear() + amount);
      break;
    case "hours":
    case "hour":
      result.setHours(result.getHours() + amount);
      break;
    case "minutes":
    case "minute":
      result.setMinutes(result.getMinutes() + amount);
      break;
    case "seconds":
    case "second":
      result.setSeconds(result.getSeconds() + amount);
      break;
    default:
      throw new Error(`Unsupported unit: ${unit}`);
  }

  return result;
}
