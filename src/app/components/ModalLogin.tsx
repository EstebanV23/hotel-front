import { Button, Card, CardBody, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tab, Tabs } from "@nextui-org/react";
import { useEffect, useState } from "react";
import FormLogin from "./FormLogin";

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
                  <Card>
                    <CardBody>
                      <FormLogin
                        onClose={onClose}
                        toUrl={toUrl}
                      />
                    </CardBody>
                  </Card>  
                </Tab>
                <Tab key="register" title="Registrarse">
                  <Card>
                    <CardBody>
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
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