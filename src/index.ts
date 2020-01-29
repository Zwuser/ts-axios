import { AxiosRequestConfig } from './types/index'
import xhr from './xhr'
import { buildURL } from './helper/url'
import { transformRequest } from './helper/data'

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url, params)
}

function transformRequestData(config: AxiosRequestConfig): string {
  const { data } = config
  return transformRequest(data)
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transformRequestData(config)
}

export default function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
  // TODO
}
