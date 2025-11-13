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
}
