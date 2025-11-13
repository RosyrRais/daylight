import { Database, Prop, getModelForClass } from '@gulux/gulux/typegoose';

@Database('daylightDB')
export class User {
  @Prop()
  public username?: string;

  @Prop()
  public password?: string;
}

// 指定集合名称为 'daylightDB'
export const UserModel = getModelForClass(User, {
  schemaOptions: { collection: 'user' },
});
