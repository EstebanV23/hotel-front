import Container from "./Container";
import HabitacionesContent from "./HabitacionesContent";

export default function SectionHabitaciones() {
  return (
    <Container
      className="mt-20"
    >
      <aside className="flex flex-col gap-3">
        <h2 className="text-4xl font-bold text-center">¿En búsqueda de una habitación?</h2>
        <p className="text-gray-500 text-justify">
          Aquí encontrará las mejores y más variadas habitaciones, solo búsquelos y reserve el que más le guste.
        </p>
      </aside>
      <HabitacionesContent />
    </Container>
  )
}