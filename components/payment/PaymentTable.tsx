import { BaseService } from "../../libs/base.service";
import { IPaymentResult, PaymentService } from "../../libs/payment.service";
import { SearchTable } from "../wrapper/SearchTable";
import { UpdateInvoiceDialog } from "./UpdateInvoiceDialog";

interface PaymentTableRowProps {
  item: IPaymentResult;
}

function PaymentTableRow({ item }: PaymentTableRowProps) {
  return (
    <tr>
      <td>{item.invoice.invoice_id}</td>
      <td>
        {item.user.user_firstname} {item.user.user_lastname}
      </td>
      <td>{new Date(item.invoice.invoice_create_date).toLocaleString()}</td>
      <td>{item.invoice.invoice_charge_amount}</td>
      <td>{item.invoice.invoice_status}</td>
      <td>
        <UpdateInvoiceDialog />
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
      renderRow={(item, index) => (
        <PaymentTableRow key={index} item={item}></PaymentTableRow>
      )}
      headers={[
        "ID",
        "User",
        "Create Date",
        "Charge Amount",
        "Status",
        "Action",
      ]}
    ></SearchTable>
  );
}
