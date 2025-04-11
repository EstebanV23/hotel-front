import { Button } from "@nextui-org/react";

export default function Confirm({
  title,
  text,
  lblSuccess = "Aceptar",
  lblCancel = "Cancelar",
  fnSuccess = () => {},
  fnCancel = () => {},
  children
}: {
  title: string
  text: string
  lblSuccess?: string
  lblCancel?: string
  fnSuccess?: () => void
  fnCancel?: () => void
  children?: React.ReactNode
}) {
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h1 className="text-lg font-medium">{title}</h1>
        <p className="text-sm">{text}</p>
        {children}
      </div>
      <div className="flex gap-4">
        <Button variant="flat" color="success" onClick={fnSuccess}>{lblSuccess}</Button>
        <Button variant="light" color="danger" onClick={fnCancel}>{lblCancel}</Button>
      </div>
    </div>
  )
}