import { Api, Data, Query, useInject } from '@edenx/runtime/bff';
import { Success, Fail } from 'api/util/api';
import { GuluXSession } from '@gulux/gulux/session';
import EmailService from '../../service/email';
import z from 'zod';
import { Param } from '@gulux/gulux/application-http';

// 新建邮件的数据验证
const createEmailData = z.object({
  recipient: z.string().min(1, '收件人不能为空'),
  title: z.string().min(1, '标题不能为空'),
  content: z.string().min(1, '内容不能为空'),
});

// 修改邮件状态的数据验证
const updateEmailStatusData = z.object({
  _id: z.string().min(1, '邮件ID不能为空'),
  isRead: z.boolean().optional(),
  recipientDel: z.boolean().optional(),
  senderDel: z.boolean().optional(),
});

// 获取邮件列表的查询参数验证
const getEmailListQuery = z.object({
  emailType: z.enum(['sent', 'received'], {
    errorMap: () => ({ message: 'emailType必须是sent或received' }),
  }),
});

/**
 * 获取邮件列表接口
 */
export const get = Api(Query(getEmailListQuery), async ({ query }) => {
  const emailService = useInject(EmailService);
  const session = useInject(GuluXSession);

  try {
    const username = session.get('username') as string;

    if (!username) {
      return Fail({
        code: 401,
        message: '未登录',
        data: null,
      });
    }

    const emails = await emailService.getEmailList(username, query.emailType);

    return Success({
      message: '获取邮件列表成功',
      data: emails,
    });
  } catch (error) {
    return Fail({
      code: 500,
      message: error instanceof Error ? error.message : '获取邮件列表失败',
      data: null,
    });
  }
});

/**
 * 新建邮件接口
 */
export const post = Api(Data(createEmailData), async ({ data }) => {
  const emailService = useInject(EmailService);
  const session = useInject(GuluXSession);

  try {
    // 从 session 获取当前用户，如果没有则使用 data.sender
    const currentUser = session.get('username') as string;

    const email = await emailService.createEmail({
      recipient: data.recipient,
      sender: currentUser,
      title: data.title,
      content: data.content,
    });

    return Success({
      message: '邮件创建成功',
      data: email,
    });
  } catch (error) {
    return Fail({
      code: 500,
      message: error instanceof Error ? error.message : '邮件创建失败',
      data: null,
    });
  }
});

/**
 * 修改邮件状态接口
 */
export const put = Api(Data(updateEmailStatusData), async ({ data }) => {
  const emailService = useInject(EmailService);

  try {
    // 检查是否至少提供了一个状态字段
    if (
      data.isRead === undefined &&
      data.recipientDel === undefined &&
      data.senderDel === undefined
    ) {
      return Fail({
        code: 400,
        message: '至少需要提供一个状态字段进行更新',
        data: null,
      });
    }

    const email = await emailService.updateEmailStatus({
      _id: data._id,
      isRead: data.isRead,
      recipientDel: data.recipientDel,
      senderDel: data.senderDel,
    });

    if (!email) {
      return Fail({
        code: 404,
        message: '邮件不存在',
        data: null,
      });
    }

    return Success({
      message: '邮件状态更新成功',
      data: email,
    });
  } catch (error) {
    return Fail({
      code: 500,
      message: error instanceof Error ? error.message : '邮件状态更新失败',
      data: null,
    });
  }
});
