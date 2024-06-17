import React, {Children, ReactNode} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";

interface ModalProps {
    title: string,
    open: boolean,
    children: ReactNode,
    onClose: any
    size: "xs" | "sm"| "md"| "lg"| "xl"| "2xl"| "3xl"| "4xl"| "5xl"| "full",
    // onSubmit: any
    scrollable?: "inside" | "outside"
  }


const AUModal: React.FC<ModalProps> = ({ ...props }) => {

    return (
    <>

      <Modal isOpen={props.open} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true} size={props.size} scrollBehavior={props.scrollable} >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-app-009">{props.title}</ModalHeader>
              <ModalBody>
                {props.children}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
    );

};

export default AUModal;