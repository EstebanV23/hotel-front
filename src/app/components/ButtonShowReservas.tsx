import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Image } from "@nextui-org/react";
import { useReservaStore } from "../store/reservasStore";
import { IconReceiptFilled } from "@tabler/icons-react";

import { getAmountHabitacionFormat } from "../utils/getAmountHabitacion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ButtonShowReservas() {
  const { habitacionesReserva } = useReservaStore((store) => store)
  const router = useRouter()
  function toReserva() {
    router.push('/reservar')
  }

  if (!habitacionesReserva || habitacionesReserva.length === 0) return null

  return (
    <div className="fixed right-10 bottom-10 z-20">
      <Dropdown>
        <DropdownTrigger>
          <Button 
            startContent={<IconReceiptFilled />}
          >
            Reserva
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions" className="max-h-72 overflow-y-auto">
          <DropdownSection title={`Resumen de reservas (${habitacionesReserva.length})`}>
            {
              habitacionesReserva.map(habReserva => (
                <DropdownItem key={habReserva.id_habitacion+'idhabitacion'}>
                  <div className="flex gap-2">
                    <Image
                      src={habReserva.images_tbl.find(image => image.ind_pri_image === 1)?.url_image ?? habReserva.images_tbl[0].url_image}
                      alt={habReserva.des_habitacion}
                      width={100}
                      height={100}
                      className="object-cover object-center"
                      radius="full"

                    />
                    <aside>
                      <h3 className="text-lg">{habReserva.des_habitacion}</h3>
                      <small className="text-gray-400">{habReserva.tipo_alojamiento_tbl.des_tipo_alojamiento}</small>
                      <p className="font-bold">{getAmountHabitacionFormat({ habitacion: habReserva })}</p>
                    </aside>
                  </div>
                </DropdownItem>
              ))
            }
          </DropdownSection>
          <DropdownSection title="Acciones">
            <DropdownItem className="text-purple-600" onClick={() => toReserva()} color="secondary">
              Ir a reservar
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
