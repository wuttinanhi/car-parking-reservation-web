import { FetcherWrapper } from "./fetcher.wrapper";
import { PaginationOptions } from "./pagination";

export interface IUserShareable {
  user_email: string;
  user_firstname: string;
  user_id: number;
  user_lastname: string;
  user_phone_number: string;
  user_username: string;
}

export interface IUserFull {
  user_citizen_id: string;
  user_email: string;
  user_firstname: string;
  user_id: number;
  user_lastname: string;
  user_phone_number: string;
  user_username: string;
}

export class UserService {
  constructor(private fetcher: FetcherWrapper) {}

  pagination(opts: PaginationOptions) {
    return this.fetcher.get("/user/admin/search", opts);
  }
}
