export type FetchErrorRecord = { [key: string]: string[] };


export class FetchError extends Error {
  public json: any;

  constructor(json: any) {
    super("Fetch Error");
    this.name = "FetchError";
    this.json = json;
  }

  public getJson() {
    return this.json;
  }
}
