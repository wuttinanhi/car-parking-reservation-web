import DashboardLayout from "../../../components/common/DashboardLayout";
import { PaymentTable } from "../../../components/payment/PaymentTable";

export default function PaymentDashboardIndex() {
  return (
    <DashboardLayout headerName="Payment">
      <PaymentTable />
    </DashboardLayout>
  );
}
