import Image from "next/image";

import { Avatar, AvatarFallback } from "../ui/avatar";

interface Props {
  name: string;
  imageUrl?: string | null;
  className?: string;
}

const UserAvatar = ({ name, imageUrl, className = "h-9 w-9" }: Props) => {
  const initials = name
    .split(" ")
    .map((word: string) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <Avatar className={className}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            className="object-cover"
            width={36}
            height={36}
            quality={100}
          />
        ) : (
          <AvatarFallback className="flex w-full items-center justify-center bg-secondary font-semibold tracking-wider text-white">
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </>
  );
};

export default UserAvatar;
