import { Inject, Injectable } from '@gulux/gulux';
import { ModelType } from '@gulux/gulux/typegoose';
import { Email } from 'api/model/email';

export interface CreateEmailData {
  recipient: string;
  sender: string;
  title: string;
  content: string;
}

export interface UpdateEmailStatusData {
  _id: string;
  isRead?: boolean;
  recipientDel?: boolean;
  senderDel?: boolean;
}

@Injectable()
export default class EmailService {
  @Inject(Email)
  private EmailModel: ModelType<Email>;

  /**
   * 新建邮件
   * @param data 邮件数据
   * @returns 创建的邮件对象
   */
  public async createEmail(data: CreateEmailData): Promise<Email> {
    const email = new this.EmailModel({
      recipient: data.recipient,
      sender: data.sender,
      title: data.title,
      content: data.content,
      isRead: false,
      recipientDel: false,
      senderDel: false,
    });
    return await email.save();
  }

  /**
   * 改变邮件状态
   * @param data 更新数据
   * @returns 更新后的邮件对象
   */
  public async updateEmailStatus(
    data: UpdateEmailStatusData,
  ): Promise<Email | null> {
    const updateData: Partial<Email> = {};
    if (data.isRead !== undefined) {
      updateData.isRead = data.isRead;
    }
    if (data.recipientDel !== undefined) {
      updateData.recipientDel = data.recipientDel;
    }
    if (data.senderDel !== undefined) {
      updateData.senderDel = data.senderDel;
    }

    return await this.EmailModel.findByIdAndUpdate(
      data._id,
      { $set: updateData },
      { new: true },
    );
  }

  /**
   * 获取邮件列表
   * @param username 用户名
   * @param emailType 邮件类型：'sent' 发送的邮件，'received' 接收的邮件
   * @returns 邮件列表
   */
  public async getEmailList(
    username: string,
    emailType: 'sent' | 'received',
  ): Promise<Email[]> {
    const query: Record<string, unknown> = {};

    if (emailType === 'sent') {
      query.sender = username;
      query.senderDel = false;
    } else {
      query.recipient = username;
      query.recipientDel = false;
    }

    return await this.EmailModel.find(query).sort({ _id: -1 });
  }

  /**
   * 根据ID获取单个邮件
   * @param emailId 邮件ID
   * @returns 邮件对象
   */
  public async getEmailById(emailId: string): Promise<Email | null> {
    return await this.EmailModel.findById(emailId);
  }
}
