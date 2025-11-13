import { Api, Data, useInject } from '@edenx/runtime/bff';
import { Success, Fail } from 'api/util/api';
import { GuluXSession } from '@gulux/gulux/session';
import UserService from '../../service/user';
import z from 'zod';

const loginData = z.object({
  username: z.string(),
  password: z.string(),
});

export const post = Api(Data(loginData), async ({ data }) => {
  const { username, password } = data;

  // 注入 UserService 和 GuluXSession
  const userService = useInject(UserService);
  const session = useInject(GuluXSession);

  // 验证用户身份
  const isValid = await userService.authenticate(username, password);

  if (isValid) {
    // 登录成功，将用户信息存储到 session
    session.set('userId', username);
    session.set('username', username);
    session.set('loginTime', Date.now());

    return Success({
      message: '登录成功',
      username,
    });
  } else {
    // 登录失败
    return Fail({
      code: 401,
      message: '用户名或密码错误',
      data: null,
    });
  }
});
