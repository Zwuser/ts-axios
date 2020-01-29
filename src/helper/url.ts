import { isDate, isObject } from './util'

export function encodeUrl(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const value = params[key]
    if (value === null || typeof value === 'undefined') {
      return
    }
    let val: string[]
    if (Array.isArray(value)) {
      key += '[]'
      val = value
    } else {
      val = [value]
    }
    val.forEach(value => {
      if (isDate(value)) {
        value = value.toISOString()
      } else if (isObject(value)) {
        value = JSON.stringify(value)
      }
      parts.push(`${encodeUrl(key)}=${encodeUrl(value)}`)
    })
    const serializedParams = parts.join('&')
    if (serializedParams) {
      const idx = url.indexOf('#')
      if (idx !== -1) {
        url = url.slice(0, idx)
      }
    }
    url = url + (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  })
  return url
}
