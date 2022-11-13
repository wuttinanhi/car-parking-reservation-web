import { ICar } from "./car.service";
import { FetcherWrapper } from "./fetcher.wrapper";
import { PaginationOptions } from "./pagination";
import { IParkingLot } from "./parking-lot.service";
import { IUserFull } from "./user.service";

export interface IReservation {
  reservation_end_time: string;
  reservation_id: number;
  reservation_start_time: string;
}

export interface IReservationResult {
  car: ICar;
  parking_lot: IParkingLot;
  reservation: IReservation;
  user: IUserFull;
}

export class ReservationService {
  constructor(private fetcher: FetcherWrapper) {}

  pagination(opts: PaginationOptions) {
    return this.fetcher.get("/reservation/admin/list", opts);
  }

  endReservation(id: number, createInvoice: boolean) {
    return this.fetcher.delete(`/reservation/admin/end`, {
      reservation_id: id,
      create_invoice: createInvoice,
    });
  }
}
