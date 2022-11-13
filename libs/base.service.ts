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

  public static setApiKey(apiKey: string) {
    BaseService.apiKey = apiKey;
  }

  public static getApiKey() {
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
}
