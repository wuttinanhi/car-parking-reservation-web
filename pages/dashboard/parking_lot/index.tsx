import { AuthGuard } from "../../../components/auth/AuthGuard";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { ParkingLotDisplay } from "../../../components/parking-lot/ParkingLotDisplay";

export default function ParkingLotDashboardIndex() {
  return (
    <>
      <AuthGuard />
      <DashboardLayout headerName="Parking Lot">
        <ParkingLotDisplay />
      </DashboardLayout>
    </>
  );
}
