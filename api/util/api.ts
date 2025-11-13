/** 接口成功的 response 封装 */
export const Success = <T>(
  data: T,
): { code: 0; message: 'success'; data: T } => ({
  code: 0,
  message: 'success',
  data,
});

export const Fail = <T>({
  code = -1,
  message = 'fail',
  data,
}: {
  code?: number;
  message?: string;
  data: T;
}): { code: number; message: string; data: T } => ({
  code,
  message,
  data,
});
