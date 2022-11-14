import { useState } from "react";
import { Button } from "react-bootstrap";
import { DataDialog } from "../components/wrapper/DataDialog";
import { IInputType } from "../components/wrapper/FormWrapper";

const inputTypes: IInputType[] = [
  // text
  {
    apiField: "username",
    header: "Username",
    placeholder: "Username",
    type: "text",
  },
  // number
  {
    apiField: "age",
    header: "Age",
    placeholder: "Age",
    type: "number",
  },
  // textarea
  {
    apiField: "bio",
    header: "Bio",
    placeholder: "Bio",
    type: "textarea",
  },
  // date
  {
    apiField: "date",
    header: "Date",
    placeholder: "Date",
    type: "date",
  },
  // select
  {
    apiField: "select",
    header: "Select",
    placeholder: "Select",
    type: "select",
    options: [
      { value: "1", label: "One" },
      { value: "2", label: "Two" },
      { value: "3", label: "Three" },
    ],
  },
  // checkbox
  {
    apiField: "checkbox",
    header: "Checkbox",
    placeholder: "Checkbox",
    type: "checkbox",
  },
];

// export default function Test() {
//   const [formData, setFormData] = useState<any>({});

//   return (
//     <>
//       <h1>{JSON.stringify(formData)}</h1>

//       <FormWrapper
//         onFormChange={(data) => setFormData(data)}
//         inputTypes={inputTypes}
//       />
//     </>
//   );
// }

export default function Test() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState<any>({});

  return (
    <>
      <h1>{JSON.stringify(formData)}</h1>
      <Button onClick={() => setShow(true)}>Show Data Dialog</Button>
      <DataDialog
        formData={formData}
        inputTypes={inputTypes}
        onFormChange={(data) => setFormData(data)}
        title="Test Data Dialog"
        show={show}
        onHide={() => setShow(false)}
        onSubmit={(data) => {
          setShow(false);
        }}
      />
    </>
  );
}
