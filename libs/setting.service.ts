import { FetcherWrapper } from "./fetcher.wrapper";

export interface ISetting {
  charge_within_hour: number;
  charge_more_than_a_hour: number;
  charge_more_than_a_day: number;
}

export interface ISettingUpdate extends ISetting {}

export class SettingService {
  constructor(private fetcher: FetcherWrapper) {}

  get() {
    return this.fetcher.get("/settings/get", null);
  }

  update(data: ISettingUpdate) {
    return this.fetcher.post("/settings/set", data);
  }
}
