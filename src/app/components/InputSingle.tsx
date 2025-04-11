import { Input } from "@nextui-org/react";
import { ReactNode } from "react";

export default function InputSingle({
  setValue,
  label,
  placeholder,
  type = "text",
  startContent,
  endContent,
  labelPlacement = "outside",
  min,
  max,
  className
}: {
  setValue: (value: string) => void
  label: string
  placeholder?: string
  type?: string
  startContent?: ReactNode
  endContent?: ReactNode
  labelPlacement?: "outside" | "inside"
  min?: number
  max?: number
  className?: string
}) {
  return (
    <Input
      label={label}
      placeholder={placeholder}
      type={type}
      startContent={startContent}
      endContent={endContent}
      labelPlacement={labelPlacement}
      onValueChange={setValue}
      min={min}
      max={max}
      className={className}
    />
  )
}