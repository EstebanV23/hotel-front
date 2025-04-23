import { useEffect, useState } from "react";
import { ErrorInputs } from "../models/ErrorInputs";
import MyInput from "./MyInput";
import { Button } from "@nextui-org/react";
import PasswordInput from "./PasswordInput";
import { BodyLogin } from "../models/BodyLogin";
import { useAuthStore } from "../store/authStore";
import { login } from "../services/authService";
import { useLoaderStore } from "../store/loaderStore";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";

export default function FormLogin({
  onClose,
  toUrl
}: {
  onClose: () => void,
  toUrl?: string
}) {
  const router = useRouter()
  const [startValidate, setStartValidate] = useState(false);
  const [errorsInputs, setErrorsInputs] = useState<ErrorInputs[]>([]);
  const { setUser } = useAuthStore((store) => store)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStartValidate(true);
    if (errorsInputs.some(error => error.isInvalid)) return;
    const body: BodyLogin = {
      email: '',
      password: ''
    }
    errorsInputs.forEach(error => error.element?.name === 'email' ? body.email = error.element.value : body.password = error.element?.value)
    
    toast.promise(async () => {
      const response = await login(body)
      if (response.error) {
        console.error(response.error)
        toast.error(response.error)
        return
      }
      toast.message(response.message, {
        description: `Bienvenido ${response.data.user.nom_usuario}`
      })
      setUser({
        idUsuario: response.data.user.id_usuario,
        nomUsuario: response.data.user.nom_usuario,
        emaUsuario: response.data.user.ema_usuario,
        token: response.data.token
      })

      localStorage.setItem('user', JSON.stringify({
        idUsuario: response.data.user.id_usuario,
        nomUsuario: response.data.user.nom_usuario,
        emaUsuario: response.data.user.ema_usuario,
        token: response.data.token
      }))

      onClose()
      if (toUrl) {
        router.push(toUrl)
      }
    }, {
      loading: 'Ingresando...'
    })
  }

  return (
    <>
      <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
        <p className="font-semibold text-2xl text-center">Ingresa</p>
        <MyInput
          label="Correo electrónico"
          placeholder="correo@dominio.com"
          type="email"
          errorMessage="Correo electrónico inválido"
          initValue=""
          regex={/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/}
          errorsInput={errorsInputs}
          startValidate={startValidate}
          name="email"
        />
        <PasswordInput
          errorsInputs={errorsInputs}
          startValidate={startValidate}
          name="password"
        />
        <Button
          variant="bordered"
          color="success"
          type="submit"
        >
          Ingresar
        </Button>
      </form>
    </>
  )
}
