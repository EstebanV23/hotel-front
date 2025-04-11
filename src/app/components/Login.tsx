import { Button } from "@nextui-org/button";
import { IconLogin } from "@tabler/icons-react";
import ModalLogin from "./ModalLogin";
import { useDisclosure } from "@nextui-org/react";
import { usePathname } from "next/navigation";

export default function Login() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const pathName = usePathname()

  return (
    <>
      <Button
        variant="bordered"
        color="default"
        startContent={<IconLogin />}
        onPress={onOpen}
      >
        Login
      </Button>
      <ModalLogin
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        toUrl={pathName}
      />
    </>
  )
}