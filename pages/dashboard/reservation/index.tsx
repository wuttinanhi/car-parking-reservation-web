import { AuthGuard } from "../../../components/auth/AuthGuard";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { ReservationTable } from "../../../components/reservation/ReservationTable";

export default function ReservationDashboardIndex() {
  return (
    <>
      <AuthGuard />
      <DashboardLayout headerName="Reservation">
        <ReservationTable />
      </DashboardLayout>
    </>
  );
}
