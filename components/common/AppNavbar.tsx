import { Navbar } from "react-bootstrap";

export function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home" className="ms-5">
        Car Parking Reservation System
      </Navbar.Brand>
    </Navbar>
  );
}
