import { Button } from "@nextui-org/button";
import { IconUser } from "@tabler/icons-react";
import { useAuthStore } from "../store/authStore";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Logged() {
  const { nomUsuario, emaUsuario, logout } = useAuthStore((store) => store)
  const router = useRouter()

  return (
    <Dropdown >
      <DropdownTrigger>
        <Button
          variant="bordered"
          color="default"
          startContent={<IconUser />}
        >
          <div className="flex flex-col gap-0 text-start">
            <p className="font-semibold">{nomUsuario}</p>
            <small>{emaUsuario}</small>
          </div>
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Example with disabled actions"
        onAction={(key) => {
          if (key === 'delete') {
            toast.error('Desea cerrar sesión?', {
              position: 'top-center',
              description: 'Se cerrará cualquier proceso actual que esté realizando',
              action: <Button color="danger" variant="flat" onClick={() => {
                toast.dismiss()
                toast.message('Sesión cerrada', {
                  description: 'Hasta luego'
                })
                logout()
              }} >
                Confirmar
              </Button>
            })
            
          }
        }}
      >
        <DropdownItem key="new" onClick={() => {router.push('/misreservas')}}>Mis reservas</DropdownItem>
        <DropdownItem key="copy">Editar perfil</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Cerrar sesión
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

