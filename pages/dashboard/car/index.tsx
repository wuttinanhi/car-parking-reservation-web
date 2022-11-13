import { CarTable } from "../../../components/car/CarTable";
import DashboardLayout from "../../../components/common/DashboardLayout";

export default function CarDashboardIndex() {
  return (
    <DashboardLayout headerName="Car">
      <CarTable />
    </DashboardLayout>
  );
}
