import { Api, useInject } from '@edenx/runtime/bff';
import { Success, Fail } from 'api/util/api';
import { GuluXSession } from '@gulux/gulux/session';
import EmailService from '../../service/email';

/**
 * 获取单个邮件接口
 * 验证只有发送人和接收人可以查看
 */
export const get = Api(async context => {
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

    // 从 context 中获取路径参数
    const { params } = context as { params?: { emailId?: string } };
    const emailId = params?.emailId;

    if (!emailId) {
      return Fail({
        code: 400,
        message: '邮件ID不能为空',
        data: null,
      });
    }

    const email = await emailService.getEmailById(emailId);

    if (!email) {
      return Fail({
        code: 404,
        message: '邮件不存在',
        data: null,
      });
    }

    // 验证只有发送人和接收人可以查看
    if (email.sender !== username && email.recipient !== username) {
      return Fail({
        code: 403,
        message: '无权查看此邮件',
        data: null,
      });
    }

    return Success({
      message: '获取邮件成功',
      data: email,
    });
  } catch (error) {
    return Fail({
      code: 500,
      message: error instanceof Error ? error.message : '获取邮件失败',
      data: null,
    });
  }
});
