import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { BaseService } from "../libs/base.service";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [apiUrl, setApiUrl] = useState("");

  useEffect(() => {
    fetch("/api/url")
      .then((res) => res.json())
      .then((data) => {
        BaseService.setApiKey("@Dev12345");
        BaseService.setApiUrl(data.apiUrl);
        setApiUrl(data.apiUrl);
      });
  }, []);

  if (!apiUrl) return null;

  return (
    <>
      <title>Car Parking Reservation System</title>
      <Component {...pageProps} />
    </>
  );
}
