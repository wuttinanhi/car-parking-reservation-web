import { AuthGuard } from "../../../components/auth/AuthGuard";
import DashboardLayout from "../../../components/common/DashboardLayout";
import { PaymentTable } from "../../../components/payment/PaymentTable";

export default function PaymentDashboardIndex() {
  return (
    <>
      <AuthGuard />
      <DashboardLayout headerName="Payment">
        <PaymentTable />
      </DashboardLayout>
    </>
  );
}
