import DashboardLayout from "../../../components/common/DashboardLayout";
import { ReservationTable } from "../../../components/reservation/ReservationTable";

export default function ReservationDashboardIndex() {
  return (
    <DashboardLayout headerName="Reservation">
      <ReservationTable />
    </DashboardLayout>
  );
}
