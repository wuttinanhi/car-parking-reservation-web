import { useRouter } from "next/router";
import { useEffect } from "react";

export default function DashboardIndex() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/parking_lot");
  }, [router]);

  return null;
}
