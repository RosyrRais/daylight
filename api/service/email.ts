import { Inject, Injectable } from '@gulux/gulux';
import { ModelType } from '@gulux/gulux/typegoose';
import { Email } from 'api/model/email';

@Injectable()
export default class EmailService {
  @Inject(Email)
  private EmailModel: ModelType<Email>;
}
