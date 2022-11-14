import DashboardLayout from "../../../components/common/DashboardLayout";
import { ParkingLotDisplay } from "../../../components/parking-lot/ParkingLotDisplay";

export default function ParkingLotDashboardIndex() {
  return (
    <DashboardLayout headerName="Parking Lot">
      <ParkingLotDisplay />
    </DashboardLayout>
  );
}
