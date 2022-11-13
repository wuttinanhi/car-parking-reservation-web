import { useEffect } from "react";
import { BaseService } from "../../libs/base.service";

export function ApiSetup() {
  useEffect(() => {
    fetch("/api/url")
      .then((res) => res.json())
      .then((data) => BaseService.setApiUrl(data.apiUrl));
  }, []);

  return null;
}
