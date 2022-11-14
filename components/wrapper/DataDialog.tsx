import { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { FormWrapper, IFormWrapperProps } from "./FormWrapper";

interface IDataDialogProps {
  title?: string;
  show: boolean;

  onHide?: () => void;
  onSubmit?: (data: any) => void;

  formWrapperProps: IFormWrapperProps;

  apiMethod?: "POST" | "PATCH" | "DELETE";
  apiUrl?: string;
}

export function DataDialog({
  show,
  onSubmit,
  onHide,
  title,
  formWrapperProps,
  apiUrl,
  apiMethod,
}: IDataDialogProps) {
  const [formData, setFormData] = useState<any>(formWrapperProps.formData);
  const [fetchError, setFetchError] = useState<string | null>(null);

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
          setFetchError(json);
        }
      } catch (err) {
        setFetchError((err as Error).name);
      }
    } else {
      onSubmit && onSubmit(formData);
    }
  }

  function onFormChange(data: any) {
    setFormData(data);
    formWrapperProps.onFormChange && formWrapperProps.onFormChange(data);
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
          {fetchError && (
            <Alert variant="danger" className="my-2">
              {fetchError}
            </Alert>
          )}
          <FormWrapper
            {...formWrapperProps}
            onFormChange={(data) => onFormChange(data)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger fw-bold" onClick={() => internalSubmit()}>
            Confirm
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => {
              if (onHide) onHide();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
