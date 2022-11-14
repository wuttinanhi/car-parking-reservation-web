import { useState } from "react";
import { Button } from "react-bootstrap";
import { BaseService } from "../../libs/base.service";
import { FetchError } from "../../libs/error";
import { IInvoice, PaymentService } from "../../libs/payment.service";
import { DataDialog } from "../wrapper/DataDialog";
import { IInputType } from "../wrapper/FormWrapper";

export interface UpdateInvoiceDialogProps {
  invoice: IInvoice;
  onChange?: (invoice: IInvoice) => void;
}

export function UpdateInvoiceDialog({
  invoice,
  onChange,
}: UpdateInvoiceDialogProps) {
  const [formData, setFormData] = useState(changeDataPrefix(invoice, false));
  const [error, setError] = useState<any>(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  function changeDataPrefix(data: any, add: boolean) {
    const newObj: any = {};
    // loop object key
    for (const key in data) {
      // add prefix
      if (add) {
        newObj[`invoice_${key}`] = data[key];
      } else {
        // remove prefix
        newObj[key.replace("invoice_", "")] = data[key];
      }
    }
    return newObj;
  }

  function removeUnknownFields(data: any) {
    const newObj: any = {};
    // unused fields
    const unusedFields = ["create_date", "id", "reservation_id", "user_id"];
    for (const key in data) {
      // if key is not in unused fields
      if (!unusedFields.includes(key)) newObj[key] = data[key];
    }
    return newObj;
  }

  async function onSubmit(data: any) {
    try {
      const service = new PaymentService(BaseService.getFetcherWrapper());
      data.invoice_id = invoice.invoice_id;

      const newData = removeUnknownFields(data);
      await service.updateInvoice(newData);

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
        title="Update Invoice"
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
    apiField: "charge_amount",
    header: "Charge Amount",
    placeholder: "Charge Amount",
    type: "number",
    required: true,
  },
  {
    apiField: "description",
    header: "Description",
    placeholder: "Description",
    type: "textarea",
    required: true,
  },
  {
    apiField: "status",
    header: "Status",
    placeholder: "Status",
    type: "select",
    required: true,
    options: [
      { value: "UNPAID", label: "UNPAID" },
      { value: "PAID", label: "PAID" },
      { value: "CANCELED", label: "CANCELED" },
      { value: "REFUNDED", label: "REFUNDED" },
    ],
  },
];
