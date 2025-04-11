import { IconBusinessplan, IconCalendarEvent, IconDoor, IconUsers } from "@tabler/icons-react"
import { HabitacionReserva, useReservaStore } from "../store/reservasStore"
import getCapacity from "../utils/getCapacity"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Iconos from "./Iconos"
import { Carousel } from "react-responsive-carousel"
import { Button, DateValue, Image, Input, RangeValue, useDisclosure } from "@nextui-org/react"
import { formatCurrency, getAmountHabitacion, getAmountHabitacionFormat } from "../utils/getAmountHabitacion"
import { useEffect, useState } from "react"
import PickerDate from "./PickerDate"
import getDisableRanges from "../utils/getDisableRanges"
import { toast } from "sonner"
import Confirm from "./Confirm"
import { format } from "@formkit/tempo"
import { useAuthStore } from "../store/authStore"
import { useLoaderStore } from "../store/loaderStore"
import reservarService from "../services/reservarService"
import ModalLogin from "./ModalLogin"

export default function ReservaDetail({
  habitacion
}: {
  habitacion: HabitacionReserva
}) {
  const { removeHabitacion } = useReservaStore((store) => store)
  const maxCapacity = getCapacity({habitacion})
  const { token, idUsuario } = useAuthStore((state) => state)
  const { startLoading, stopLoading } = useLoaderStore((state) => state)
  const [dateRange, setDateRange] = useState<RangeValue<DateValue> | null>(null)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [canPersonas, setCanPersonas] = useState("1")
  const [total, setTotal] = useState(0)
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  function confirmReserva() {
    if (!token || !idUsuario) {
      onOpen()
      return
    }
    
    if (!startDate || !endDate || !canPersonas || canPersonas === "0" || !total) {
      toast.error("Debe seleccionar las fechas y la cantidad de personas", {
        position: "top-center"
      })
      return
    }
    toast(<Confirm
      title="Confirmar reserva"
      text="¿Está seguro de realizar la reserva?"
      lblSuccess="Reservar"
      lblCancel="Cancelar"
      fnCancel={() => toast.dismiss()}
      fnSuccess={async () => {
        toast.dismiss()
        startLoading()
        const reservaSuccess = await reservarService({
          habitaciones: [{
            idHabitacion: habitacion.id_habitacion,
            fecInicio: startDate.toISOString(),
            fecFinal: endDate.toISOString(),
            canPersonas: Number(canPersonas),
            cosTotal: total,
          }],
          token: token ?? ''
        })
        stopLoading()
        console.log({reservaSuccess})
        if (reservaSuccess === null || reservaSuccess.error) {
          toast.error("Ocurrió un error al realizar la reserva", {
            position: "top-center"
          })
          return
        }
        toast.success("Reserva realizada con éxito", {
          position: "top-center"
        })
        removeHabitacion({ idHabitacion: habitacion.id_habitacion })
      }}
    >
      <h4>Detalles de la reserva</h4>
      <p className="flex gap-2 items-center font-bold"><IconDoor />Habitación: {habitacion.des_habitacion}</p>
      <p className="flex gap-2 items-center"><IconCalendarEvent />Fecha de ingreso: {format(startDate, 'full')}</p>
      <p className="flex gap-2 items-center"><IconCalendarEvent />Fecha de salida: {format(endDate, 'full')}</p>
      <p className="flex gap-2 items-center"><IconUsers />Cantidad de personas: {canPersonas}</p>
      <p className="flex gap-2 items-center"><IconBusinessplan />Total: {formatCurrency(total)}</p>
      <small className="text-gray-500">El cobro de la reserva se realizará el mismo día de ingreso, se le llamará para confirmar</small>
    </Confirm>)
  }

  useEffect(() => {
    if (dateRange) {
      const initDate = dateRange.start.toDate('America/Bogota')
      const endDate = dateRange.end.toDate('America/Bogota')
      setStartDate(initDate)
      setEndDate(endDate)
      setTotal(getAmountHabitacion({
        habitacion,
        fecInicio: initDate,
        fecFin: endDate,
      }))
    }
  }, [dateRange])

  return (
    <div className="flex gap-3 items-stretch">
      <ModalLogin
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
      <div className="max-w-80">
        <Carousel className="h-full w-full" showThumbs={false}>
          {
            habitacion.images_tbl.map((image) => {
              return (
                <div key={image.id_image+'habitacionimg'} className="w-full h-full">
                  <Image
                    src={image.url_image}
                    alt="Habitación"
                    className="object-cover object-center w-full h-full"
                  />
                </div>
              )
            })
          }
        </Carousel>
      </div>
      <div className="flex flex-col gap-6">
        <div className='flex justify-between w-full gap-8'>
          <div>
            <p className='font-bold'>Habitación {habitacion.des_habitacion}</p>
            <p>{habitacion.tipo_alojamiento_tbl.nom_tipo_alojamiento}</p>
            <p>{getAmountHabitacionFormat({habitacion})} <small className="text-gray-400">Por noche/día</small></p>
          </div>
          <div className="flex flex-col gap-2">
            {
              habitacion.servicio_habitacion.map((servicioHabitacion) => {
                return (
                  <div className="flex gap-3 items-center" key={servicioHabitacion.servicio_tbl.id_servicio+'serviciohabitacion'}>
                    <Iconos iconString={servicioHabitacion.servicio_tbl.tipo_servicio_tbl.ico_tipo_servicio} />
                    <p>{servicioHabitacion.can_servicio_habitacion} {servicioHabitacion.servicio_tbl.nom_servicio}</p>
                  </div>
                )
              })
            }
            <div className="flex gap-3 items-center">
              <IconUsers />
              <p>{maxCapacity} Personas</p>
            </div>
          </div>
        </div>
        <div className="flex gap-x-4 items-end">
          <PickerDate
            label="Fecha de estadía"
            setDateRange={setDateRange}
            disabledRanges={getDisableRanges({habitacion})}
          />
          <Input
            type="number"
            startContent={<IconUsers />}
            value={canPersonas}
            labelPlacement="outside"
            label="Cantidad de personas"
            onValueChange={(valor) => {
              if (Number(valor) < 1) {
                setCanPersonas("1")
                return
              }
              if (Number(valor) > maxCapacity) {
                setCanPersonas(String(maxCapacity))
                return
              }
              setCanPersonas(valor)
            }}
            placeholder="1"
            max={maxCapacity}
          />
          <div className="">
            <p className="text-medium font-bold text-nowrap"><small className="text-small font-normal">Total:</small> {formatCurrency(total)}</p>
            <Button
              color="secondary"
              variant="flat"
              onClick={confirmReserva}
            >
              Reservar
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}