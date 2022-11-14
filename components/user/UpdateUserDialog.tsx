import { useState } from "react";
import { Button } from "react-bootstrap";
import { BaseService } from "../../libs/base.service";
import { FetchError } from "../../libs/error";
import { IUserFull, UserService } from "../../libs/user.service";
import { DataDialog } from "../wrapper/DataDialog";
import { IInputType } from "../wrapper/FormWrapper";

export interface UpdateUserDialogProps {
  user: IUserFull;
  onChange?: (user: IUserFull) => void;
}

export function UpdateUserDialog({ user, onChange }: UpdateUserDialogProps) {
  const [formData, setFormData] = useState(changeDataPrefix(user, false));
  const [error, setError] = useState<any>(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  function changeDataPrefix(data: any, add: boolean) {
    const newObj: any = {};
    for (const key in data) {
      if (add) {
        newObj[`user_${key}`] = data[key];
      } else {
        newObj[key.replace("user_", "")] = data[key];
      }
    }
    return newObj;
  }

  function adjustFields(data: any) {
    const newObj: any = {};
    const requiredFields = [
      "firstname",
      "lastname",
      "phone_number",
      "citizen_id",
    ];
    for (const key in data) {
      if (requiredFields.includes(key)) newObj[key] = data[key];
    }
    return newObj;
  }

  async function onSubmit(data: any) {
    try {
      const service = new UserService(BaseService.getFetcherWrapper());

      const newData = adjustFields(data);
      newData.user_id = user.user_id;
      await service.update(newData);

      setShowUpdateDialog(false);
      setError(null);
      onChange && onChange(changeDataPrefix(newData, true));
    } catch (err) {
      if (err instanceof FetchError) {
        setError(err);
      }
    }
  }

  return (
    <>
      <Button variant="primary" onClick={() => setShowUpdateDialog(true)}>
        Update
      </Button>

      <DataDialog
        title="Update User"
        inputTypes={inputTypes}
        show={showUpdateDialog}
        formData={formData}
        onHide={() => setShowUpdateDialog(false)}
        onFormChange={(data) => setFormData(data)}
        onSubmit={onSubmit}
        errorMessage={error}
      ></DataDialog>
    </>
  );
}

const inputTypes: IInputType[] = [
  {
    apiField: "firstname",
    header: "Firstname",
    placeholder: "Firstname",
    type: "text",
    required: true,
  },
  {
    apiField: "lastname",
    header: "Lastname",
    placeholder: "Lastname",
    type: "text",
    required: true,
  },
  {
    apiField: "phone_number",
    header: "Phone Number",
    placeholder: "Phone Number",
    type: "text",
    required: true,
  },
  {
    apiField: "citizen_id",
    header: "Citizen ID",
    placeholder: "Citizen ID",
    type: "text",
    required: true,
  },
];
