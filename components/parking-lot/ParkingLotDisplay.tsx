/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { BaseService } from "../../libs/base.service";
import {
  IParkingLot,
  IParkingLotAvailable,
  ParkingLotService,
} from "../../libs/parking-lot.service";
import { ErrorRender } from "../wrapper/ErrorRender";
import { UpdateParkingLotDialog } from "./UpdateParkingLotDialog";

export interface ParkingLotRecordProps {
  data: IParkingLotAvailable;
}

export function ParkingLotRecord({ data }: ParkingLotRecordProps) {
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [parkingLot, setParkingLot] = useState<IParkingLot | null>(null);

  function renderColor() {
    if (data.open_status === false) return "secondary";
    if (data.available === false) return "danger";
    if (data.available === true) return "success";
    return "danger";
  }

  function onDialogHide() {
    setShowUpdateDialog(false);
  }

  useEffect(() => {
    setParkingLot({
      parking_lot_id: data.id,
      parking_lot_location: data.location,
      parking_lot_open_status: data.open_status,
    });
  }, [data]);

  return (
    <>
      <Card
        bg={renderColor()}
        text="white"
        className="p-3"
        style={{ width: "20rem", height: "10rem" }}
        onClick={() => setShowUpdateDialog(true)}
      >
        <Card.Body>
          <Card.Title>{data.location}</Card.Title>
          <Card.Subtitle className="my-2">
            Parking Lot ID: #{data.id}
          </Card.Subtitle>
          {data.car && data.user && (
            <>
              <Card.Text>
                Car: {data.car.car_type} ({data.car.car_license_plate})
                <br />
                User: {data.user.user_firstname} {data.user.user_lastname}
              </Card.Text>
            </>
          )}
        </Card.Body>
      </Card>
      {parkingLot && (
        <UpdateParkingLotDialog
          parkingLot={parkingLot}
          show={showUpdateDialog}
          onHide={() => onDialogHide()}
        />
      )}
    </>
  );
}

export function ParkingLotDisplay() {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>(null);

  const service = new ParkingLotService(BaseService.getFetcherWrapper());

  async function loadData() {
    try {
      const result = await service.getAvailable();
      setData(result);
    } catch (err) {
      setError(err);
    }
  }

  function renderData() {
    if (!data) return null;

    return data.map((item: any, index: number) => {
      return <ParkingLotRecord data={item} key={index} />;
    });
  }

  useEffect(() => {
    loadData();

    const interval = setInterval(() => {
      loadData();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ErrorRender error={error} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          // center the content
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {renderData()}
      </div>
    </>
  );
}
