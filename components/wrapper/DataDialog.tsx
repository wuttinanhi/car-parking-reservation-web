import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { ErrorRender } from "./ErrorRender";
import { FormWrapper, IFormWrapperProps } from "./FormWrapper";

export interface IDataDialogProps extends IFormWrapperProps {
  title?: string;
  show: boolean;

  onHide?: () => void;
  onSubmit?: (data: any) => void;

  errorMessage?: string;
}

export function DataDialog({
  show,
  onSubmit,
  onHide,
  title,
  formData: propsFormData,
  inputTypes,
  onFormChange,
  errorMessage,
}: IDataDialogProps) {
  const [formData, setFormData] = useState<any>(propsFormData);

  async function internalSubmit() {
    onSubmit && onSubmit(formData);
  }

  async function internalHide() {
    onHide && onHide();
  }

  function internalFormChange(data: any) {
    setFormData(data);
    onFormChange && onFormChange(data);
  }

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        backdrop="static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {title ?? ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ErrorRender error={errorMessage} />

          <FormWrapper
            inputTypes={inputTypes}
            formData={formData}
            onFormChange={internalFormChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary fw-bold" onClick={() => internalSubmit()}>
            Confirm
          </Button>
          <Button variant="outline-secondary" onClick={() => internalHide()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
