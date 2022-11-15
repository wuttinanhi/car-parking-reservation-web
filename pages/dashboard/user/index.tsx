import { AuthGuard } from "../../../components/auth/AuthGuard";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { UserTable } from "../../../components/user/UserTable";

export default function UserDashboardIndex() {
  return (
    <>
      <AuthGuard />
      <DashboardLayout headerName="User">
        <UserTable />
      </DashboardLayout>
    </>
  );
}
