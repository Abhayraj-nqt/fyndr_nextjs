import Image from "next/image";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback } from "../ui/avatar";

interface Props {
  name: string;
  imageUrl?: string | null;
  className?: string;
  fallbackClassName?: string;
}

const UserAvatar = ({
  name,
  imageUrl,
  className = "h-9 w-9",
  fallbackClassName,
}: Props) => {
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
          <AvatarFallback
            className={cn(
              `flex w-full items-center justify-center bg-secondary tracking-wider text-white`,
              fallbackClassName
            )}
          >
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
    </>
  );
};

export default UserAvatar;
