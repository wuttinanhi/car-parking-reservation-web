import { AuthGuard } from "../../../components/auth/AuthGuard";
import { CarTable } from "../../../components/car/CarTable";
import DashboardLayout from "../../../components/common/DashboardLayout";

export default function CarDashboardIndex() {
  return (
    <>
      <AuthGuard />
      <DashboardLayout headerName="Car">
        <CarTable />
      </DashboardLayout>
    </>
  );
}
