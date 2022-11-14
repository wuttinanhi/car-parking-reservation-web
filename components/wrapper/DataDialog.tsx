import { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { FormWrapper, IFormWrapperProps } from "./FormWrapper";

interface IDataDialogProps extends IFormWrapperProps {
  title?: string;
  show: boolean;

  onHide?: () => void;
  onSubmit?: (data: any) => void;

  errorMessage?: string;

  apiMethod?: "POST" | "PATCH" | "DELETE";
  apiUrl?: string;
}

export function DataDialog({
  show,
  onSubmit,
  onHide,
  title,
  apiUrl,
  apiMethod,
  errorMessage,
  formData: propsFormData,
  inputTypes,
  onFormChange,
}: IDataDialogProps) {
  const [formData, setFormData] = useState<any>(propsFormData);
  const [errMsg, setErrMsg] = useState<string | null>(errorMessage ?? null);

  async function internalSubmit() {
    if (apiUrl && apiMethod) {
      try {
        const res = await fetch(apiUrl, {
          method: apiMethod,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const json = await res.json();

        if (res.ok) {
          onSubmit && onSubmit(formData);
        } else {
          setErrMsg(json);
        }
      } catch (err) {
        setErrMsg((err as Error).name);
      }
    } else {
      onSubmit && onSubmit(formData);
    }
  }

  async function internalHide() {
    setErrMsg(null);
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
          {errMsg && (
            <Alert variant="danger" className="my-2">
              {errMsg}
            </Alert>
          )}

          <FormWrapper
            inputTypes={inputTypes}
            formData={formData}
            onFormChange={internalFormChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger fw-bold" onClick={() => internalSubmit()}>
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
