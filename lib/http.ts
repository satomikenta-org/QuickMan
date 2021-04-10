import axios, { AxiosInstance, AxiosResponse } from 'axios';

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export type HeaderSet = {
  [key:string]: string;
}

export class Body {
  public jsonStr: string = "";
  public jsonObj = {};

  constructor(jsonStr: string) {
    if (jsonStr) {
      this.jsonStr = JSON.stringify(jsonStr);
    } 
  }

  tryConvertJsonToObj() {
    try {
      const jsonObj = JSON.parse(this.jsonStr);
      this.jsonObj = jsonObj;
    } catch (ex) {
      throw ex;
    }
  }
};

export class HttpClient {
  private axios: AxiosInstance;
  private method: HttpMethod;
  private url: string;
  private body: Object = {};
  private response: AxiosResponse = {} as AxiosResponse;
  public statusCode: number = 0;
  public responseCookie: string = "";

  constructor(url: string, method: HttpMethod, headers: HeaderSet, body: Body) {
    this.axios = axios.create({
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      timeout: 60*5*1000 // 5 minutes
    });
    this.method = method;
    this.url = url;
    if (body && body.jsonStr) {
      body.tryConvertJsonToObj();
      this.body = body.jsonObj;
    }
  }

  async request(): Promise<void> {
    const res = await this.axios[this.method](this.url, this.body);
    this.response = res;
    this.statusCode = res.status;
    this.responseCookie = res.headers['cookie'] || res.headers['Cookie'];
  }

  outputResponse(): string {
    return JSON.stringify(this.response?.data);
  }
}