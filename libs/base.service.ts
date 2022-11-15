import { FetcherWrapper } from "./fetcher.wrapper";

export class BaseService {
  private static apiUrl: string;
  private static apiKey: string;
  private static fetcherWrapper: FetcherWrapper;

  public static setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  public static getApiUrl() {
    return this.apiUrl;
  }

  public static setApiKey(apiKey: any) {
    BaseService.apiKey = apiKey;
    localStorage.setItem("adminKey", apiKey);
  }

  public static getApiKey() {
    // try getting the api key from local storage
    const adminKey = localStorage.getItem("adminKey");

    if (adminKey) {
      this.setApiKey(adminKey);
      return adminKey;
    }

    return BaseService.apiKey;
  }

  public static getFetcherWrapper() {
    if (!BaseService.fetcherWrapper) {
      BaseService.fetcherWrapper = new FetcherWrapper(
        this.getApiUrl(),
        this.getApiKey()
      );
    }
    return BaseService.fetcherWrapper;
  }

  public static async testAdminKey(key: string) {
    try {
      this.setApiKey(key);

      const res = await fetch(`${this.getApiUrl()}/settings/set`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": this.getApiKey(),
        },
        body: null,
      });

      if (res.status === 400) {
        return true;
      }

      return false;
    } catch (err) {
      return false;
    }
  }
}
