export type Method = 'get' | 'GET' | 'post' | 'POST' | 'put' | 'PUT' | 'delete' | 'DELETE'| 'head' | 'HEAD' | 'OPTIONS' | 'options' | 'patch' | 'PATCH';

export interface AxiosRequestConfig {
  url: string;
  method?: Method;
  data?: any;
  params?: any;
}
