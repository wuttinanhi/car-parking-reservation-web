import { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
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

  function renderError() {
    if (!errorMessage) return null;
    return (
      <Alert variant="danger" className="my-2">
        {errorMessage}
      </Alert>
    );
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
          <FormWrapper
            inputTypes={inputTypes}
            formData={formData}
            onFormChange={internalFormChange}
          />

          {renderError()}
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
