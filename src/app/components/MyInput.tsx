import { Input } from "@nextui-org/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { ErrorInputs } from "../models/ErrorInputs";

export default function MyInput ({
  type,
  label,
  errorMessage,
  placeholder,
  initValue,
  errorsInput,
  startValidate,
  regex,
  endContent,
  name,
  startContent
} : {
  type: string,
  label: string,
  errorMessage: string,
  placeholder: string,
  initValue: string,
  errorsInput: ErrorInputs[],
  startValidate: boolean,
  regex?: RegExp,
  endContent?: JSX.Element,
  name: string
  startContent?: JSX.Element
}) {
  const [value, setValue] = useState(initValue);
  const [isInvalid, setIsInvalid] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const invalidText = (value:string) => {
    if (value.trim() === "") return true;

    if (regex) return !Boolean(value.match(regex))

    return false
  };

  
  useEffect(() => {
    const index = errorsInput.findIndex(error => error.element === inputRef.current);
    if (index !== -1) {
      errorsInput[index].isInvalid = invalidText(value)
      return;
    }
    errorsInput.push({
      element: inputRef.current,
      isInvalid: invalidText(value)
    })
  }, [value])

  useEffect(() => {
    if (!startValidate && !value) return
    const invalid = invalidText(value)
    setIsInvalid(invalid)
  }, [value, startValidate]);
  

  return (
    <Input
      value={value}
      type={type}
      label={label}
      variant="bordered"
      isInvalid={isInvalid}
      color={isInvalid ? "danger" : "success"}
      errorMessage={errorMessage}
      onValueChange={setValue}
      placeholder={placeholder}
      ref={inputRef}
      endContent={endContent}
      name={name}
      startContent={startContent}
    />
  );
}