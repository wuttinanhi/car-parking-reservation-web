import { useState } from "react";
import { BaseService } from "../../libs/base.service";
import { IPaymentResult, PaymentService } from "../../libs/payment.service";
import { SearchTable } from "../wrapper/SearchTable";
import { UpdateInvoiceDialog } from "./UpdateInvoiceDialog";

interface PaymentTableRowProps {
  item: IPaymentResult;
}

function PaymentTableRow({ item }: PaymentTableRowProps) {
  const [invoice, setInvoice] = useState(item.invoice);

  function onChange(data: any) {
    setInvoice((old) => ({ ...old, ...data }));
  }

  return (
    <tr>
      <td>{invoice.invoice_id}</td>
      <td>
        {item.user.user_firstname} {item.user.user_lastname}
      </td>
      <td>{new Date(item.invoice.invoice_create_date).toLocaleString()}</td>
      <td>{invoice.invoice_charge_amount}</td>
      <td>{invoice.invoice_status}</td>
      <td>{invoice.invoice_description}</td>
      <td>
        <UpdateInvoiceDialog invoice={invoice} onChange={onChange} />
      </td>
    </tr>
  );
}

export function PaymentTable() {
  return (
    <SearchTable
      fetcher={(opts) => {
        const service = new PaymentService(BaseService.getFetcherWrapper());
        return service.pagination(opts);
      }}
      renderRow={(item, index) => <PaymentTableRow key={index} item={item} />}
      headers={[
        "ID",
        "User",
        "Create Date",
        "Charge Amount",
        "Status",
        "Description",
        "Action",
      ]}
    ></SearchTable>
  );
}
