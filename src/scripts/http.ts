import { HTTPOptions, RequestOptions, Methods } from "./types";

export default class HTTPTransport {
  get = (url: string, options: HTTPOptions) => {
    return this.request(url, { ...options, method: Methods.GET }, options.timeout);
  };

  post = (url: string, options: HTTPOptions) => {
    return this.request(url, { ...options, method: Methods.POST }, options.timeout);
  };

  put = (url: string, options: HTTPOptions) => {
    return this.request(url, { ...options, method: Methods.PUT }, options.timeout);
  };

  delete = (url: string, options: HTTPOptions) => {
    return this.request(url, { ...options, method: Methods.DELETE }, options.timeout);
  };

  private queryStringify(data: any): string {
    if (typeof data !== 'object') {
      throw new Error('Data must be object');
    }

    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
      return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
    }, '?');
  }

  private request = (url: string, options: RequestOptions, timeout: number = 5000): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr: XMLHttpRequest = new XMLHttpRequest();
      const isGet: boolean = method === Methods.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${this.queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach((key: string) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
