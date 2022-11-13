import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import { AppNavbar } from "../../components/common/AppNavbar";

export interface DashboardLayoutProps {
  headerName?: string;
  children: JSX.Element;
}

export default function DashboardLayout({
  headerName,
  children,
}: DashboardLayoutProps) {
  return (
    <>
      <AppNavbar />
      <Container fluid>
        <Row>
          <Col md={2} className="vh-100 bg-light">
            <h1 className="text-center my-5">Dashboard</h1>

            <Nav defaultActiveKey="/home" className="flex-column mt-5">
              <Nav.Link href="/home">Parking Lot</Nav.Link>
              <Nav.Link href="/dashboard/car">Car</Nav.Link>
              <Nav.Link href="/dashboard/reservation">Reservation</Nav.Link>
              <Nav.Link href="/home">Payment</Nav.Link>
              <Nav.Link href="/home">User</Nav.Link>
              <Nav.Link href="/home">Chat</Nav.Link>
              <Nav.Link href="/home">Setting</Nav.Link>
            </Nav>

            <Button variant="dark" size="lg" className="mt-5 mx-auto w-100">
              Logout
            </Button>
          </Col>

          <Col md={10} className="vh-100 h-100">
            <div className="m-2 mx-5">
              {headerName && <h1 className="my-5">{headerName}</h1>}
              {children}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
