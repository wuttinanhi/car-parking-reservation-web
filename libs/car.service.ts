import { FetcherWrapper } from "./fetcher.wrapper";
import { PaginationOptions } from "./pagination";
import { IUserFull } from "./user.service";

export interface ICarPaginationResult {
  car: ICar;
  user: IUserFull;
}

export interface ICar {
  car_id: number;
  car_license_plate: string;
  car_owner_id: number;
  car_type: string;
}

export class CarService {
  constructor(private fetcher: FetcherWrapper) {}

  paginationCar(opts: PaginationOptions) {
    return this.fetcher.get("/car/admin/list", opts);
  }
}
