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

  async get(url: string, params: any) {
    const response = await fetch(this.urlMaker(url, params), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
      },
    });

    return await response.json();
  }

  async post(url: string, body: any) {
    const response = await fetch(this.urlMaker(url), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  }

  async patch(url: string, body: any) {
    const response = await fetch(this.urlMaker(url), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  }

  async delete(url: string, body: any) {
    const response = await fetch(this.urlMaker(url), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
      },
      body: JSON.stringify(body),
    });

    return await response.json();
  }
}
