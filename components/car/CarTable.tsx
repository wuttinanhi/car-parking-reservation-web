import { BaseService } from "../../libs/base.service";
import { CarService, ICarPaginationResult } from "../../libs/car.service";
import { SearchTable } from "../wrapper/SearchTable";

export function CarTable() {
  return (
    <SearchTable
      fetcher={(opts) => {
        const carService = new CarService(BaseService.getFetcherWrapper());
        return carService.paginationCar(opts);
      }}
      renderRow={(item, index) => {
        const result = item as ICarPaginationResult;
        return (
          <tr key={index}>
            <td>{result.car.car_id}</td>
            <td>{result.car.car_license_plate}</td>
            <td>{result.car.car_type}</td>
            <td>
              {result.user.user_firstname} {result.user.user_lastname}
            </td>
          </tr>
        );
      }}
      headers={["ID", "License Plate", "Type", "User"]}
    ></SearchTable>
  );
}
