import { useState } from "react";
import { ErrorInputs } from "../models/ErrorInputs";
import MyInput from "./MyInput";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { Button } from "@nextui-org/react";

export default function PasswordInput({
  errorsInputs,
  startValidate,
  initVisible = false,
  name
}: {
  errorsInputs: ErrorInputs[],
  startValidate: boolean,
  initVisible?: boolean,
  name: string
}) {
  const [visible, setVisible] = useState(initVisible);

  function handleVisible() {
    setVisible(!visible);
  }

  return (
    <MyInput
      label="Contraseña"
      placeholder="******"
      type={visible ? "text" : "password"}
      errorMessage="Tu contraseña no debe estar vacía"
      initValue=""
      errorsInput={errorsInputs}
      startValidate={startValidate}
      endContent={
        <Button onClick={handleVisible} isIconOnly variant="light" type="button">
          { visible ? <IconEye /> : <IconEyeOff /> }
        </Button>
      }
      name={name}
    />
  )
}