import { Button, Card, CardBody, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";

export default function ModalLogin({
  isOpen,
  onOpenChange,
  toUrl
}: {
  isOpen: boolean
  onOpenChange: (open: boolean) => void,
  toUrl?: string
}) {
  return (
    <Modal isOpen={isOpen} backdrop="blur" onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Sesión</ModalHeader>
              <ModalBody>
              <Tabs color="primary" aria-label="login or register">
                <Tab key="login" title="Iniciar sesión">
                  <Card className="max-h-[60vh] overflow-y-auto">
                    <CardBody>
                      <FormLogin
                        onClose={onClose}
                        toUrl={toUrl}
                      />
                    </CardBody>
                  </Card>  
                </Tab>
                <Tab key="register" title="Registrarse">
                  <Card className="max-h-[60vh] overflow-y-auto">
                    <CardBody>
                    <FormRegister
                        onClose={onClose}
                        toUrl={toUrl}
                      />
                    </CardBody>
                  </Card>  
                </Tab>
              </Tabs>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
  )
}