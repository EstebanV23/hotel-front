'use client'
import { Button, DateRangePicker, DateValue, RangeValue } from "@nextui-org/react";
import { parseZonedDateTime, fromDate } from '@internationalized/date'
import ServiciosFiltro from "./ServiciosFiltro";
import { useEffect, useState } from "react";
import PickerDate from "./PickerDate";
import InputSingle from "./InputSingle";
import { IconUsersGroup } from "@tabler/icons-react";
import { Servicio } from "../models/Servicio";
import { format } from '@formkit/tempo'
import { ResponseHabitaciones } from "../models/Habitacion";
import getHabitaciones from "../services/habitacionesService";

export default function Filtros({
  setHabitaciones,
  dateRange,
  setDateRange
} : {
  setHabitaciones: (habitaciones: ResponseHabitaciones) => void
  dateRange: RangeValue<DateValue> | null
  setDateRange: (value: RangeValue<DateValue>) => void
}) {
  const currentDateTime = new Date()
  const nextYearDateTime = new Date()
  nextYearDateTime.setFullYear(currentDateTime.getFullYear() + 1)
  const endDate = new Date()
  endDate.setDate(currentDateTime.getDate() + 1)
  const myDate = new Date()
  myDate.setHours(0, 0, 0, 0)

  const [servicios, setServicios] = useState<Set<Servicio>>(new Set())
  const [personas, setPersonas] = useState<string>('')
  const [currentValues, setCurrentValues] = useState({
    personas: '',
    servicios: new Set<Servicio>(),
    dates: ''
  })

  function applyFilter() {
    if (servicios.size === 0 && !personas && !dateRange) return
    setCurrentValues({
      personas,
      servicios,
      dates: dateRange ? `${format(dateRange.start.toDate('America/Bogota'), 'full')} al ${format(dateRange.end.toDate('America/Bogota'), 'full')}` : ''
    })
  }

  function cleanFilters() {
    if (servicios.size === 0 && !personas && !dateRange) return
    setPersonas('')
    setServicios(new Set())
    setCurrentValues((oldValues) => ({
      personas: '',
      servicios: new Set(),
      dates: oldValues.dates
    }))
  }

  useEffect(() => {
    console.log({currentValues})
    console.log('Ejecutar consulta SQL')
    getHabitaciones({
      cantPersonas: Number(personas),
      servicios: Array.from(servicios).map(servicio => servicio.id_servicio),
      fecInicio: dateRange?.start.toDate('America/Bogota') ?? myDate,
      fecFinal: dateRange?.end.toDate('America/Bogota') ?? myDate
    })
      .then((data) => {
        if (!data) return

        if (data.error) {
          console.log(data.message)
          return
        }
        console.log({data})
        setHabitaciones(data.data as ResponseHabitaciones)
      })
  }, [currentValues])

  return (
    <section className="flex flex-col items-end gap-3">
      <section className="flex md:flex-row flex-col mt-10 gap-3 md:items-end w-full">
        <PickerDate
          label="Fechas de estancia"
          setDateRange={setDateRange}
        />
        <ServiciosFiltro
          values={servicios}
          setValues={setServicios}
        />
        <InputSingle
          label="Personas"
          placeholder="0"
          type="number"
          min={1}
          max={12}
          endContent={
            <IconUsersGroup color="gray" />
          }
          setValue={setPersonas}
          className="max-w-20"
        />
      </section>
      <div className="flex md:flex-row flex-col-reverse gap-4 w-full justify-between items-start">
        <div className="text-gray-500">
          <p>Filtros actuales</p>
          <p>{currentValues.personas && `Personas: ${currentValues.personas}`}</p>
          <p>{currentValues.servicios.size > 0 && `Servicios: ${Array.from(currentValues.servicios).map(servicio => servicio.nom_servicio).join(', ')}`}</p>
          <p>{currentValues.dates && `Fechas: ${currentValues.dates}`}</p>
        </div>
        <div className="flex gap-3 items-center">
          <Button
            onClick={applyFilter}
            variant="flat"
            color="secondary"
          >
            Aplicar filtro
          </Button>
          <Button
            variant="light"
            color="danger"
            onClick={cleanFilters}
          >
            Limpiar filtros
          </Button>
        </div>
      </div>
    </section>
  )
}