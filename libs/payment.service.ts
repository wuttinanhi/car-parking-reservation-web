import { IUpdateInvoice } from "./common.types";
import { FetcherWrapper } from "./fetcher.wrapper";
import { PaginationOptions } from "./pagination";
import { IUserShareable } from "./user.service";

export interface IInvoice {
  invoice_charge_amount: number;
  invoice_create_date: string;
  invoice_id: number;
  invoice_reservation_id: number;
  invoice_status: string;
  invoice_user_id: number;
  invoice_description: string;
}

export interface IPaymentResult {
  invoice: IInvoice;
  user: IUserShareable;
}

export class PaymentService {
  constructor(private fetcher: FetcherWrapper) {}

  pagination(opts: PaginationOptions) {
    return this.fetcher.get("/payment/admin/list", opts);
  }

  updateInvoice(data: IUpdateInvoice) {
    return this.fetcher.patch("/payment/admin/update", data);
  }
}
