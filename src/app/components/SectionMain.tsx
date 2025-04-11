'use client'
import Image from "next/image";
import Container from "./Container";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/react";
import ButtonShowReservas from "./ButtonShowReservas";

export default function SectionMain() {
  return (
    <Container>
      <section className="my-10">
        <h2 className="text-4xl font-bold">Nuestras habitaciones</h2>
        <div className="grid grid-cols-1 place-items-center md:grid-cols-2 mt-4 gap-8">
          <aside className="h-full flex flex-col gap-4 justify-between">
            <p className="text-lg text-justify">
            Bienvenido a Hotel Dual, un lugar donde el confort y la elegancia se fusionan para ofrecerle una experiencia única. Nuestras habitaciones, cuidadosamente diseñadas, están equipadas con todas las comodidades modernas que necesita para una estadía placentera. Cada espacio ha sido pensado para garantizar su descanso y bienestar, ya sea que nos visite por negocios o placer.
            </p>
            <p className="text-gray-500 text-justify">
              Al hacer su reserva con tiempo, también podrá aprovechar las promociones especiales y paquetes que ofrecemos, diseñados para hacer su experiencia aún más memorable. No deje pasar la oportunidad de asegurar su lugar en nuestro hotel y disfrutar de todo lo que tenemos para ofrecer. <strong>¡Esperamos darle la bienvenida pronto!</strong>
            </p>
            <div>
              <Button
                href="https://github.com/nextui-org/nextui"
                as={Link}
                variant="ghost"
                color="secondary"
                showAnchorIcon
                size="md"
              >
                Ver habitaciones
              </Button>
            </div>
          </aside>
          <Image
            src="/images/room.jpg"
            width={400}
            height={400}
            className="object-cover object-center aspect-square"
            alt="Habitación"
          />
        </div>
      </section>
      <ButtonShowReservas />
    </Container>
  )
}