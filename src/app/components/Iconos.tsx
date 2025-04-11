import * as icons from "@tabler/icons-react"
import { JSXElementConstructor } from "react"
export default function Iconos({
  iconString
}: {
  iconString: string
}) {
  const MyIcon = icons[iconString as keyof typeof icons] as JSXElementConstructor<any>
  return (
    <MyIcon />
  )

}