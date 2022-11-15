import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { FormWrapper } from "../wrapper/FormWrapper";
import { AuthContext } from "./auth.context";

export default function LoginForm() {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [formData, setFormData] = useState<any>({});

  function onSubmit() {
    authContext.login(formData.password);
  }

  useEffect(() => {
    // if auth context is null null then redirect to dashboard
    if (authContext.isLoggedIn) {
      // wait for local storage to be updated
      setTimeout(() => router.push("/dashboard"), 1000);
    }
  }, [authContext, router]);

  useEffect(() => {
    function tryLoginFirst() {
      const localAdminKey = localStorage.getItem("adminKey");
      if (localAdminKey) authContext.login(localAdminKey);
    }

    tryLoginFirst();
  }, [authContext]);

  return (
    <Card border="dark">
      <Card.Header>Car Parking Reservation System</Card.Header>
      <Card.Body>
        <Card.Title>Admin Login</Card.Title>
        <FormWrapper
          formData={formData}
          onFormChange={(data) => setFormData(data)}
          inputTypes={[
            {
              apiField: "password",
              header: "Password",
              type: "password",
              placeholder: "Password",
              required: true,
            },
          ]}
        />
        <Button variant="primary" className="mt-3" onClick={onSubmit}>
          Login
        </Button>
      </Card.Body>
    </Card>
  );
}
