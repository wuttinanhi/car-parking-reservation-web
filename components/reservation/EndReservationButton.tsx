import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { BaseService } from "../../libs/base.service";
import {
  IReservation,
  ReservationService,
} from "../../libs/reservation.service";

interface IEndReservationButtonProps {
  reservation: IReservation;
  afterEnd?: () => void;
}

export function EndReservationButton({
  reservation,
  afterEnd,
}: IEndReservationButtonProps) {
  const [show, setShow] = useState(false);

  const [createInvoice, setCreateInvoice] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(
    reservation.reservation_end_time !== null
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleConfirm() {
    const service = new ReservationService(BaseService.getFetcherWrapper());
    service
      .endReservation(reservation.reservation_id, createInvoice)
      .then(() => {
        setButtonDisabled(true);
        handleClose();
        if (afterEnd) afterEnd();
      });
  }

  return (
    <>
      <Button variant="danger" onClick={handleShow} disabled={buttonDisabled}>
        End Reservation
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            End Reservation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure want to end this reservation?</p>
          <Form.Check
            type="checkbox"
            label={`Create invoice for this reservation`}
            checked={createInvoice}
            onChange={(e) => setCreateInvoice(e.target.checked)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger fw-bold" onClick={() => handleConfirm()}>
            Confirm
          </Button>
          <Button variant="outline-secondary" onClick={() => handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
