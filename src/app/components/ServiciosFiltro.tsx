import { Dispatch, JSXElementConstructor, SetStateAction, useEffect, useState } from "react";
import { getServices } from "../services/servicioService";
import { toast } from "sonner";
import { Select, SelectItem, Skeleton } from "@nextui-org/react";
import { Servicio } from "../models/Servicio";
import Iconos from "./Iconos";

export default function ServiciosFiltro({
  values,
  setValues
}: {
  values: Set<Servicio>,
  setValues: Dispatch<SetStateAction<Set<Servicio>>>
}) {
  const [servicios, setServicios] = useState<Servicio[] | null>(null);

  useEffect(() => {
    getServices()
      .then((data) => {
        if (!data) return;

        if (data.error) {
          toast.error(data.message);
          return
        }

        setServicios(data.data);
      })
  }, [])

  return (
    <Select
      label="Servicios"
      placeholder="Selecciona los servicios incluidos"
      selectionMode="multiple"
      labelPlacement="outside"
      disabledKeys={["loadingservice"]}
      className="max-w-sm"
      onSelectionChange={(e) => {
        if (!servicios) return 
        const actualValue = servicios.find(servicio => servicio.id_servicio === Number(e.currentKey))
        console.log({actualValue})
        setValues((oldValues) => {
          oldValues.has(actualValue as Servicio) ? oldValues.delete(actualValue as Servicio) : oldValues.add(actualValue as Servicio)
          return new Set(oldValues)
        })
      }}
    >
      {servicios ? servicios.map((servicio: Servicio) => {
        const nomIcon: string = servicio.tipo_servicio_tbl?.ico_tipo_servicio
        return (
          <SelectItem
            key={servicio.id_servicio}
            value={servicio.id_servicio}
            textValue={servicio.nom_servicio}
          >
            <div className="flex items-center gap-2">
              <Iconos iconString={nomIcon} />
              <span>{servicio.nom_servicio}</span>
            </div>
          </SelectItem>
        )
      }) : <SelectItem key="loadingservice" selectedIcon>
          <Skeleton className="rounded-lg h-6 w-100" />
        </SelectItem>}
    </Select>
  )
}