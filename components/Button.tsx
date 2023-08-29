"use client";
import Image from "next/image";
import { title } from "process";

interface CustomButtonProps {
  title: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  textStyles?: string;
  containerStyles?: string;
  btnType?: "button" | "submit" | "reset";
  rightIcon?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onClick,
  textStyles,
  containerStyles,
  btnType,
  rightIcon,
}) => {
  return (
    <button
      className={` ${containerStyles}`}
      type={btnType || "button"}
      onClick={onClick}
    >
      <span className={`flex-1 ${textStyles}`}>{title}</span>
      {rightIcon && (
        <div className="relative w-6 h-[1.2rem]">
          <Image
            src={rightIcon}
            alt="allow_left"
            width="15"
            height="15"
            className="object-contain"
          />
        </div>
      )}
    </button>
  );
};
export default CustomButton;
