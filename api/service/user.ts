import { Inject, Injectable } from '@gulux/gulux';
import { ModelType } from '@gulux/gulux/typegoose';
import { User } from 'api/model/user';

@Injectable()
export default class UserService {
  @Inject(User)
  private UserModel: ModelType<User>;

  public async getAllUser() {
    return await this.UserModel.find();
  }

  /**
   * 验证用户身份
   * @param username 用户名
   * @param password 密码
   * @returns 如果账号密码都正确返回 true，否则返回 false
   */
  public async authenticate(
    username: string,
    password: string,
  ): Promise<boolean> {
    const user = await this.UserModel.findOne({ username, password });
    return !!user;
  }
}
