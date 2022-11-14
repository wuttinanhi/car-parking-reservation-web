/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, useEffect, useState } from "react";
import { Form } from "react-bootstrap";

export interface IInputType {
  header: string;
  placeholder: string;
  type:
    | "text"
    | "number"
    | "email"
    | "password"
    | "textarea"
    | "date"
    | "select"
    | "checkbox";
  apiField: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

export interface IFormWrapperProps {
  formData: any;
  inputTypes: IInputType[];
  onFormChange?: (data: any) => void;
}

export function FormWrapper({
  inputTypes,
  onFormChange,
  formData,
}: IFormWrapperProps) {
  const [data, setData] = useState<any>(formData);

  function setDataField(e: ChangeEvent<any>, inputType: IInputType) {
    // get data tag data-api-field
    const apiField = e.target.getAttribute("data-api-field");

    // if input type is checkbox, set data to checked value
    if (inputType.type === "checkbox") {
      setData((prev: any) => ({ ...prev, [apiField]: e.target.checked }));
    } else {
      // set data state
      setData((prev: any) => ({ ...prev, [apiField]: e.target.value }));
    }
  }

  function renderInput(input: IInputType) {
    if (input.type === "checkbox") {
      return (
        <Form.Check
          type="checkbox"
          label={input.header}
          data-api-field={input.apiField}
          checked={data[input.apiField] ?? false}
          onChange={(e) => setDataField(e, input)}
          key={input.apiField}
        />
      );
    } else if (input.type === "textarea") {
      return (
        <Form.Group key={input.apiField}>
          <Form.Label>{input.header}</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            data-api-field={input.apiField}
            value={data[input.apiField] ?? ""}
            onChange={(e) => setDataField(e, input)}
          />
        </Form.Group>
      );
    } else if (input.type === "date") {
      return (
        <Form.Group key={input.apiField}>
          <Form.Label>{input.header}</Form.Label>
          <Form.Control
            type="date"
            data-api-field={input.apiField}
            value={data[input.apiField] ?? ""}
            onChange={(e) => setDataField(e, input)}
          />
        </Form.Group>
      );
    } else if (input.type === "select") {
      return (
        <Form.Group key={input.apiField}>
          <Form.Label>{input.header}</Form.Label>
          <Form.Control
            as="select"
            data-api-field={input.apiField}
            value={data[input.apiField] ?? ""}
            onChange={(e) => setDataField(e, input)}
          >
            {input.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
      );
    } else {
      return (
        <Form.Group controlId={input.apiField} key={input.apiField}>
          <Form.Label>{input.header}</Form.Label>
          <Form.Control
            type={input.type}
            placeholder={input.placeholder}
            required={input.required}
            value={data[input.apiField] ?? ""}
            onChange={(e) => setDataField(e, input)}
            data-api-field={input.apiField}
          />
        </Form.Group>
      );
    }
  }

  function renderForm() {
    return <Form>{inputTypes.map((input) => renderInput(input))}</Form>;
  }

  // trigger when data change
  useEffect(() => {
    // call onFormChange
    if (onFormChange) onFormChange(data);
  }, [data]);

  return <>{renderForm()}</>;
}
