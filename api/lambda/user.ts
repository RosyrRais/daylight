import { Api, Get, useInject } from '@edenx/runtime/bff';
import UserService from '../service/user';
import { Success } from 'api/util/api';

export const getUserInfo = Api(Get('/user'), async () => {
  const userService = useInject(UserService);
  const result = await userService.getAllUser();
  return Success(result);
});
