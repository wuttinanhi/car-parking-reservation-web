import { AuthGuard } from "../../../components/auth/AuthGuard";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { SettingForm } from "../../../components/setting/SettingForm";

export default function SettingDashboardIndex() {
  return (
    <>
      <AuthGuard />
      <DashboardLayout headerName="Setting">
        <SettingForm />
      </DashboardLayout>
    </>
  );
}
