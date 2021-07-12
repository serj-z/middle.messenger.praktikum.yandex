import { HTTPOptions } from "../dto/types";
import HTTPTransport from "./http";

const httpWrap = async (
  url: string,
  options: HTTPOptions,
  method: (url: string, options: HTTPOptions) => Promise<XMLHttpRequest>
) => {
  try {
    const { response } = await method(`https://ya-praktikum.tech/api/v2${url}`, options);
    return response;
  } catch (err) {
    throw err;
  }
}

export const httpGet = (url: string, options: HTTPOptions) => httpWrap(url, options, new HTTPTransport().get);
export const httpPost = (url: string, options: HTTPOptions) => httpWrap(url, options, new HTTPTransport().post);
export const httpPut = (url: string, options: HTTPOptions) => httpWrap(url, options, new HTTPTransport().put);
export const httpDelete = (url: string, options: HTTPOptions) => httpWrap(url, options, new HTTPTransport().delete);