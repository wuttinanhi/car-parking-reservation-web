import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { FetchError, FetchErrorRecord } from "../../libs/error";

export interface IErrorRenderProps {
  error: any;
}

export function ErrorRender({ error }: IErrorRenderProps) {
  const [errorHeader, setErrorHeader] = useState<string>("Error");
  const [errorBody, setErrorBody] = useState<string>("");
  const [show, setShow] = useState(true);

  useEffect(() => {
    function renderError() {
      if (!error) return;

      // check is error is string
      if (typeof error === "string") {
        setErrorHeader("Error");
        setErrorBody(error);
      } else if (error instanceof FetchError) {
        const json: FetchErrorRecord = error.getJson();
        // loop key and value
        let buffer = [];
        for (const [key, value] of Object.entries(json)) {
          const keyParsed = key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
          buffer.push(`${keyParsed}: ${value}`);
        }
        // join with new line
        setErrorBody(buffer.join("\r\n"));
      } else {
        setErrorBody(error.message);
      }
    }

    renderError();
    setShow(true);
  }, [error]);

  if (!error) return null;

  return (
    <Alert
      variant="danger"
      onClose={() => setShow(false)}
      dismissible
      show={show}
    >
      <h5>{errorHeader}</h5>
      <pre>{errorBody}</pre>
    </Alert>
  );
}
