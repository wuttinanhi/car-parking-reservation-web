import { FetchError } from "./error";

export class FetcherWrapper {
  private baseUrl: string;
  private apiKey: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  private urlMaker(url: string, params?: any) {
    return `${this.baseUrl}${url}?${new URLSearchParams({
      ...params,
    }).toString()}`;
  }

  private async fetchFactory(
    method: string,
    url: string,
    params?: any,
    body?: any
  ) {
    const response = await fetch(this.urlMaker(url, params), {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
      },
      body: JSON.stringify(body),
    });

    // parse json
    const json = await response.json();

    // if response is not ok, throw an error
    if (!response.ok) {
      throw new FetchError(json);
    }

    // if response is ok, return the json
    return json;
  }

  async get(url: string, params?: any) {
    return this.fetchFactory("GET", url, params);
  }

  async post(url: string, body: any) {
    return this.fetchFactory("POST", url, null, body);
  }

  async patch(url: string, body: any) {
    return this.fetchFactory("PATCH", url, null, body);
  }

  async delete(url: string, body: any) {
    return this.fetchFactory("DELETE", url, null, body);
  }
}
