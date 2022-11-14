import DashboardLayout from "../../../components/common/DashboardLayout";
import { SettingForm } from "../../../components/setting/SettingForm";

export default function SettingDashboardIndex() {
  return (
    <DashboardLayout headerName="Setting">
      <SettingForm />
    </DashboardLayout>
  );
}
