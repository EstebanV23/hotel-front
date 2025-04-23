import { useState } from "react";
import { ErrorInputs } from "../models/ErrorInputs";
import MyInput from "./MyInput";
import { Button } from "@nextui-org/react";
import PasswordInput from "./PasswordInput";
import { useAuthStore } from "../store/authStore";
import { register } from "../services/authService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BodyRegister } from "../models/BodyRegister";
import Image from "next/image";

export default function FormRegister({
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
    const formData = new FormData(event.currentTarget)
    setStartValidate(true);
    if (errorsInputs.some(error => error.isInvalid)) return;

    if (formData.get('veriConUsuario') !== formData.get('conUsuario')) {
      toast.error('Las contraseñas no coinciden')
      return
    }
    
    const body: BodyRegister = {
      nomUsuario: formData.get('nomUsuario') as string,
      emaUsuario: formData.get('emaUsuario') as string,
      conUsuario: formData.get('conUsuario') as string,
      dirUsuario: formData.get('dirUsuario') as string,
      numDocUsuario: formData.get('numDocUsuario') as string,
      telUsuario: formData.get('telUsuario') as string,
      fecNacUsuario: formData.get('fecNacUsuario') as string
    }
    
    toast.promise(async () => {
      const response = await register(body)
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
      loading: 'Registrando...'
    })
  }

  return (
    <>
      <form className="w-full flex flex-col gap-3" onSubmit={handleSubmit}>
        <p className="font-semibold text-2xl text-center">Registro</p>
        <MyInput
          label="Nombre de usuario"
          placeholder="Esteban Villamizar"
          type="text"
          errorMessage="Nombre de usuario inválido"
          initValue=""
          regex={/^[a-zA-ZÀ-ÿ\s]{1,40}$/}
          errorsInput={errorsInputs}
          startValidate={startValidate}
          name="nomUsuario"
        />
        <div className="flex flex-grow gap-3">
          <MyInput
            label="Nro. Documento"
            placeholder="3167328482"
            type="text"
            errorMessage="Número documento inválido"
            initValue=""
            startContent={<span className="mt-1 p-2 rounded-md bg-gray-100 text-small h-[1.2rem] flex items-center justify-center gap-1">CC</span>}
            regex={/^\d{8,12}$/}
            errorsInput={errorsInputs}
            startValidate={startValidate}
            name="numDocUsuario"
          />
          <MyInput
            label="Nro. Contacto"
            placeholder="3167328482"
            type="text"
            errorMessage="Número de teléfono inválido"
            initValue=""
            startContent={<span className="mt-1 p-2 rounded-md bg-gray-100 text-small h-[1.2rem] flex items-center justify-center gap-1"><Image src="https://upload.wikimedia.org/wikipedia/commons/2/21/Flag_of_Colombia.svg" alt="co" width={10} height={10} className="h-[0.5rem] w-full" />+57</span>}
            regex={/^\d{10}$/}
            errorsInput={errorsInputs}
            startValidate={startValidate}
            name="telUsuario"
          />
        </div>
        <MyInput
          label="Dirección"
          placeholder="Cra 17 #6-45"
          type="text"
          errorMessage=""
          initValue=""
          errorsInput={errorsInputs}
          startValidate={startValidate}
          name="dirUsuario"
        />
        <MyInput
          label="Correo electrónico"
          placeholder="correo@dominio.com"
          type="email"
          errorMessage="Correo electrónico inválido"
          initValue=""
          regex={/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/}
          errorsInput={errorsInputs}
          startValidate={startValidate}
          name="emaUsuario"
        />
        <PasswordInput
          errorsInputs={errorsInputs}
          startValidate={startValidate}
          name="conUsuario"
        />
        <PasswordInput
          errorsInputs={errorsInputs}
          startValidate={startValidate}
          name="veriConUsuario"
          label="Verificar contraseña"
        />
        <Button
          variant="bordered"
          color="success"
          type="submit"
        >
          Registrarse
        </Button>
      </form>
    </>
  )
}
