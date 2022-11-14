import { useState } from "react";
import { BaseService } from "../../libs/base.service";
import { IParkingLot, ParkingLotService } from "../../libs/parking-lot.service";
import { DataDialog } from "../wrapper/DataDialog";
import { IInputType } from "../wrapper/FormWrapper";

export interface UpdateParkingLotDialogProps {
  parkingLot: IParkingLot;
  show: boolean;
  onSubmit?: (parkingLot: any) => void;
  onHide?: () => void;
}

export function UpdateParkingLotDialog({
  parkingLot,
  onSubmit,
  show,
  onHide,
}: UpdateParkingLotDialogProps) {
  const [formData, setFormData] = useState(changeDataPrefix(parkingLot, false));
  const [error, setError] = useState<any>(null);

  function changeDataPrefix(data: any, add: boolean) {
    const newObj: any = {};
    for (const key in data) {
      if (add) {
        newObj[`parking_lot_${key}`] = data[key];
      } else {
        newObj[key.replace("parking_lot_", "")] = data[key];
      }
    }
    return newObj;
  }

  function adjustFields(data: any) {
    const newObj: any = {};
    const requiredFields = ["parking_lot_id", "location", "open_status"];
    for (const key in data) {
      if (requiredFields.includes(key)) newObj[key] = data[key];
    }
    return newObj;
  }

  async function onFormSubmit(data: any) {
    try {
      const service = new ParkingLotService(BaseService.getFetcherWrapper());

      const newData = adjustFields(data);
      newData.parking_lot_id = parkingLot.parking_lot_id;
      await service.update(newData);

      onHide && onHide();
      setError(null);
      onSubmit && onSubmit(changeDataPrefix(newData, true));
    } catch (err) {
      setError(err);
    }
  }

  return (
    <>
      <DataDialog
        title="Update Parking Lot"
        inputTypes={inputTypes}
        show={show}
        formData={formData}
        onHide={() => {
          onHide && onHide();
        }}
        onFormChange={(data) => setFormData(data)}
        onSubmit={onFormSubmit}
        errorMessage={error}
      ></DataDialog>
    </>
  );
}

const inputTypes: IInputType[] = [
  {
    header: "Location",
    type: "text",
    apiField: "location",
    required: true,
    placeholder: "Location",
  },
  {
    header: "Open Status",
    type: "checkbox",
    apiField: "open_status",
    required: true,
    placeholder: "Open Status",
  },
];
