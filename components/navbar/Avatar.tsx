import Image from "next/image";
import React from "react";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      src={src || "/placeholder.jpg"}
      height={30}
      width={30}
      alt="Avatar logo"
      className="rounded-full"
    />
  );
};

export default Avatar;
