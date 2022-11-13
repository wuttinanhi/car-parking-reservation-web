import DashboardLayout from "../../../components/common/DashboardLayout";
import { UserTable } from "../../../components/user/UserTable";

export default function UserDashboardIndex() {
  return (
    <DashboardLayout headerName="User">
      <UserTable />
    </DashboardLayout>
  );
}
