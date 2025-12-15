import { easyCreateForm } from '@byted/easy-formily';
import { useMemo, useState } from 'react';
import { FormProvider } from '@formily/react';
import { SchemaField } from '@/component/formily/schemaField';
import { Button, Toast, Typography } from '@douyinfe/semi-ui';
import { IconCode, IconImage, IconSend } from '@douyinfe/semi-icons';
import style from './index.module.scss';
import { post as login } from '@api/login';
import { useNavigate } from '@edenx/runtime/router';
import { motion, AnimatePresence } from 'motion/react';
import { BlurCardCss } from '@/component';

const Index: React.FC = () => {
  const { Title } = Typography;
  const loginForm = useMemo(() => easyCreateForm(), []);
  const { DataMapper } = SchemaField;
  const navigate = useNavigate();
  const [showBg, setShowBg] = useState(true);

  const handleLogin = async () => {
    const loginData = DataMapper.getValues(loginForm);
    const res = await login({ data: loginData });
    console.log('loginRes:', res);
    if (res.code === 0) {
      // 登录成功
      setShowBg(false);
      setTimeout(() => {
        navigate('/dashboard');
      }, 500);
    } else {
      // 登录失败
      Toast.error(res.message);
    }
  };

  return (
    <div className="flex justify-center items-center bg-white relative pt-60">
      <AnimatePresence>
        {showBg && (
          <>
            <motion.div
              className={style['circle-1']}
              key="circle1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <IconSend size="inherit" />
            </motion.div>
            <motion.div
              className={style['circle-2']}
              key="circle-2"
              exit={{ opacity: 0 }}
            >
              <IconImage size="inherit" />
            </motion.div>
            <motion.div
              className={style['circle-3']}
              key="circle-3"
              exit={{ opacity: 0 }}
            >
              <IconCode size="inherit" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        <motion.div
          className={`${BlurCardCss} p-5`}
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: showBg ? 0 : -500,
            opacity: 1,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 30 }}
        >
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Index;
