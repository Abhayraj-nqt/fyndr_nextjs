import { clsx, type ClassValue } from "clsx";
// import { MD5 } from "crypto-js";
import md5 from "react-native-md5";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const encryptPassword = (email: string, password: string): string => {
//   // Take first 5 characters of lowercase email
//   const emailPrefix = email.toLowerCase().substring(0, 5);

//   // Concatenate with password and create MD5 hash
//   const combined = emailPrefix + password;
//   const hashedPassword = MD5(combined).toString();

//   return hashedPassword;
// };

// export const encryptPasswordAsync = async (
//   email: string,
//   password: string
// ): Promise<string> => {
//   return Promise.resolve(encryptPassword(email, password));
// };

export const encryptPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const pwd = md5.str_md5(email.toLowerCase().substring(0, 5) + password);
  return pwd;
};
