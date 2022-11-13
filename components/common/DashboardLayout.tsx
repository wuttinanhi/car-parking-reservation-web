import Link from "next/link";
import { Button, Col, Container, Nav, Row } from "react-bootstrap";
import { AppNavbar } from "../../components/common/AppNavbar";

export interface DashboardLayoutProps {
  headerName?: string;
  children: JSX.Element[];
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

            <Nav className="flex-column mt-5">
              <Link
                href="/dashboard/parking_lot"
                className="my-2 ms-5 font-weight-bold"
              >
                Parking Lot
              </Link>
              <Link
                href="/dashboard/chat"
                className="my-2 ms-5 font-weight-bold"
              >
                Chat
              </Link>
              <Link
                href="/dashboard/car"
                className="my-2 ms-5 font-weight-bold"
              >
                Car
              </Link>
              <Link
                href="/dashboard/reservation"
                className="my-2 ms-5 font-weight-bold"
              >
                Reservation
              </Link>
              <Link
                href="/dashboard/payment"
                className="my-2 ms-5 font-weight-bold"
              >
                Payment
              </Link>
              <Link
                href="/dashboard/user"
                className="my-2 ms-5 font-weight-bold"
              >
                User
              </Link>
              <Link
                href="/dashboard/setting"
                className="my-2 ms-5 font-weight-bold"
              >
                Setting
              </Link>
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
