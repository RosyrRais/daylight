import { Database, Prop, getModelForClass } from '@gulux/gulux/typegoose';

@Database('daylightDB')
export class Email {
  @Prop({ unique: true, required: true })
  public emailId!: string;

  @Prop({ required: true })
  public recipient!: string;

  @Prop({ required: true })
  public sender!: string;

  @Prop({ default: false })
  public isRead?: boolean;

  @Prop({ required: true })
  public content!: string;

  @Prop({ required: true })
  public title!: string;
}

// 指定集合名称为 'email'
export const EmailModel = getModelForClass(Email, {
  schemaOptions: { collection: 'email' },
});
