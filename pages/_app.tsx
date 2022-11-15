import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { AuthProvider } from "../components/auth/auth.context";
import { BaseService } from "../libs/base.service";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [apiUrl, setApiUrl] = useState("");

  useEffect(() => {
    fetch("/api/url")
      .then((res) => res.json())
      .then((data) => {
        BaseService.setApiUrl(data.apiUrl);
        setApiUrl(data.apiUrl);
      });
  }, []);

  if (!apiUrl) return null;

  return (
    <>
      <AuthProvider>
        <title>Car Parking Reservation System</title>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
