// 后端统一返回数据模型
export type TResponseData<T> = {
  code: 0 | number; // 0 => ok
  msg: string;
  data: T;
};

// 后端分页数据模型
export type PageData<T = any> = {
  total: 0 | number;
  records: Array<T>;
};
