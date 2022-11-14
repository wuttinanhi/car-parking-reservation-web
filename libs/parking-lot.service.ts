import { ICar } from "./car.service";
import { FetcherWrapper } from "./fetcher.wrapper";
import { IReservation } from "./reservation.service";
import { IUserShareable } from "./user.service";

export interface IParkingLot {
  parking_lot_id: number;
  parking_lot_location: string;
  parking_lot_open_status: boolean;
}

export interface IParkingLotAvailable {
  available: boolean;
  car: ICar;
  id: number;
  location: string;
  open_status: boolean;
  reservation: IReservation;
  user: IUserShareable;
}

export interface IUpdateParkingLot {
  parking_lot_id: number;
  location: string;
  open_status: boolean;
}

export class ParkingLotService {
  constructor(private fetcher: FetcherWrapper) {}

  getAvailable(): Promise<IParkingLotAvailable[]> {
    return this.fetcher.get("/parking_lot/admin/available", null);
  }

  update(data: IUpdateParkingLot) {
    return this.fetcher.patch("/parking_lot/admin/update", data);
  }
}
