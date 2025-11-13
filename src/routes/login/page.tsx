import { easyCreateForm } from '@byted/easy-formily';
import { useMemo } from 'react';
import { FormProvider } from '@formily/react';
import { SchemaField } from '@/component/formily/schemaField';
import { Button, Toast, Typography } from '@douyinfe/semi-ui';
import { IconCode, IconImage, IconSend } from '@douyinfe/semi-icons';
import style from './index.module.scss';
import { post as login } from '@api/login';

const Index: React.FC = () => {
  const { Title } = Typography;
  const loginForm = useMemo(() => easyCreateForm(), []);
  const { DataMapper } = SchemaField;

  const handleLogin = async () => {
    const loginData = DataMapper.getValues(loginForm);
    const res = await login({ data: loginData });
    console.log('loginRes:', res);
    if (res.code === 0) {
      // 登录成功
      // 跳转逻辑 etc
    } else {
      // 登录失败
      Toast.error(res.message);
    }
  };

  return (
    <div className="flex justify-center items-center bg-white relative pt-60">
      <div className={style['circle-1']}>
        <IconSend size="inherit" />
      </div>
      <div className={style['circle-2']}>
        <IconImage size="inherit" />
      </div>
      <div className={style['circle-3']}>
        <IconCode size="inherit" />
      </div>
      <div className="rounded-xl p-5 backdrop-blur-md border border-gray-300">
        <Title heading={2}>登录</Title>
        <FormProvider form={loginForm}>
          <SchemaField form={loginForm}>
            <SchemaField.Void
              x-component="FormLayout"
              x-component-props={{ labelWidth: 100, wrapperWidth: 500 }}
            >
              <SchemaField.String
                name="username"
                title="用户名称"
                x-decorator="FormItem"
                x-component="Input"
              />
              <SchemaField.String
                name="password"
                title="密码"
                x-decorator="FormItem"
                x-component="Input"
                x-component-props={{
                  mode: 'password',
                }}
              />
            </SchemaField.Void>
          </SchemaField>
        </FormProvider>
        <div className="flex justify-center gap-4">
          <Button onClick={handleLogin}>登录</Button>
          <Button>注册</Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
