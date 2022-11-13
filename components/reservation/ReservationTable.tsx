import { useState } from "react";
import { BaseService } from "../../libs/base.service";
import {
  IReservationResult,
  ReservationService,
} from "../../libs/reservation.service";
import { SearchTable } from "../wrapper/SearchTable";
import { EndReservationButton } from "./EndReservationButton";

interface ReservationTableRowProps {
  item: IReservationResult;
}

function ReservationTableRow({ item }: ReservationTableRowProps) {
  const [endDate, setEndDate] = useState<string>(
    item.reservation.reservation_end_time
  );

  return (
    <tr>
      <td>{item.reservation.reservation_id}</td>
      <td>
        {item.user.user_firstname} {item.user.user_lastname}
      </td>
      <td>{item.parking_lot.parking_lot_location}</td>
      <td>
        {item.car.car_type} ({item.car.car_license_plate})
      </td>
      <td>
        {new Date(item.reservation.reservation_start_time).toLocaleString()}
      </td>
      <td>{endDate && new Date(endDate).toLocaleString()}</td>
      <td>
        <EndReservationButton
          reservation={item.reservation}
          afterEnd={() => setEndDate(new Date().toISOString())}
        />
      </td>
    </tr>
  );
}

export function ReservationTable() {
  return (
    <SearchTable
      fetcher={(opts) => {
        const service = new ReservationService(BaseService.getFetcherWrapper());
        return service.pagination(opts);
      }}
      renderRow={(item, index) => (
        <ReservationTableRow key={index} item={item}></ReservationTableRow>
      )}
      headers={[
        "ID",
        "User",
        "Parking Lot",
        "Car",
        "Start Time",
        "End Time",
        "Action",
      ]}
    ></SearchTable>
  );
}
