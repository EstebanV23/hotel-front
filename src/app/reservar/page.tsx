import Link from "next/link";
import Container from "../components/Container";
import { Button } from "@nextui-org/button";
import { IconArrowBackUp } from "@tabler/icons-react";
import MainReservas from "../components/MainReservas";

export default function Page() {
  return (
    <Container className="py-10">
      <Button
        as={Link}
        href="/"
        variant="light"
      >
        <IconArrowBackUp /> Volver
      </Button>
      <h1 className="text-3xl font-bold">Realizar reservas</h1>
      <MainReservas />
    </Container>
  )
}