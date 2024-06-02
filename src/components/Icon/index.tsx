import React, { FC } from "react";

interface IconsProps {
  name: string;
  width?: number;
  height?: number;
  className?: string;
  hoverText: string;
}

const Icon: FC<IconsProps> = ({
  name,
  width = 24,
  height = 24,
  className,
  hoverText,
}) => {
  const iconPath = `/icons/${name}.svg`;

  return (
    <img
      src={iconPath}
      alt={name}
      width={width}
      height={height}
      className={className}
      title={hoverText}
    />
  );
};

export default Icon;
