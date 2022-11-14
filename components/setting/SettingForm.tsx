/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BaseService } from "../../libs/base.service";
import { SettingService } from "../../libs/setting.service";
import { ErrorRender } from "../wrapper/ErrorRender";
import { FormWrapper, IInputType } from "../wrapper/FormWrapper";

export function SettingForm() {
  const [formData, setFormData] = useState<any>(null);
  const [saveDisabled, setSaveDisabled] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const service = new SettingService(BaseService.getFetcherWrapper());

  async function loadData() {
    const setting = await service.get();
    setFormData(setting);
  }

  async function onSave() {
    try {
      setSaveDisabled(true);
      await service.update(formData);
    } catch (err) {
      setError(err as any);
    } finally {
      setSaveDisabled(false);
    }
  }

  function onChange(data: any) {
    setFormData((prev: any) => ({ ...prev, ...data }));
  }

  useEffect(() => {
    loadData();
  }, []);

  if (!formData) return null;

  return (
    <>
      <ErrorRender error={error} />

      <FormWrapper
        formData={formData}
        inputTypes={inputTypes}
        onFormChange={onChange}
      />
      <Button
        variant="primary"
        className="mt-5"
        onClick={onSave}
        disabled={saveDisabled}
      >
        Save
      </Button>
    </>
  );
}

const inputTypes: IInputType[] = [
  {
    apiField: "charge_within_hour",
    header: "Charge within hour",
    placeholder: "Charge within hour",
    type: "number",
    required: true,
  },
  {
    apiField: "charge_more_than_a_hour",
    header: "Charge more than a hour",
    placeholder: "Charge more than a hour",
    type: "number",
    required: true,
  },
  {
    apiField: "charge_more_than_a_day",
    header: "Charge more than a day",
    placeholder: "Charge more than a day",
    type: "number",
    required: true,
  },
];
