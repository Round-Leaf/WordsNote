export interface Word {
  id: number;
  word: string;
  meaning: string;      // 对应你 API 返回的字段
  source: string;    // 问号表示可选字段
  example: string;
  createdAt: string;
}