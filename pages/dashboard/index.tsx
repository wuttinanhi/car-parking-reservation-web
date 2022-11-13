import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Nav,
  Row,
  Stack,
  Table,
} from "react-bootstrap";
import { AppNavbar } from "../../components/common/AppNavbar";

export default function DashboardIndex() {
  return (
    <>
      <AppNavbar />
      <Container fluid>
        <Row>
          <Col md={2} className="vh-100 bg-light">
            <h1 className="text-center my-5">Dashboard</h1>

            <Nav defaultActiveKey="/home" className="flex-column mt-5">
              <Nav.Link href="/home">Parking Lot</Nav.Link>
              <Nav.Link href="/home">Car</Nav.Link>
              <Nav.Link href="/home">Reservation</Nav.Link>
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
              <h1 className="my-5">Car</h1>

              <InputGroup className="my-5">
                <Form.Control placeholder="Search..." />
                <Button variant="outline-secondary">Search</Button>
              </InputGroup>

              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                    <tr key={index}>
                      <td>{item}</td>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>
                        <Button variant="primary" className="mx-1">
                          Edit
                        </Button>
                        <Button variant="danger" className="mx-1">
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Stack gap={2} className="col-md-5 mx-auto my-auto mt-5">
                <Button variant="secondary">Save changes</Button>
                <Button variant="outline-secondary">Cancel</Button>
              </Stack>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
