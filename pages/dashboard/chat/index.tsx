import { AuthGuard } from "../../../components/auth/AuthGuard";
import DashboardLayout from "../../../components/common/DashboardLayout";

export default function ChatDashboardIndex() {
  return (
    <>
      <AuthGuard />
      <DashboardLayout headerName="Chat">
        <h1>TODO: Need implementation </h1>
      </DashboardLayout>
    </>
  );
}
