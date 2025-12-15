import { IconCode, IconImage, IconMail, IconSend } from '@douyinfe/semi-icons';
import { motion } from 'motion/react';
import Button from '@/component/button';
import { Outlet, useNavigate } from '@edenx/runtime/router';
import { BlurCardCss } from '@/component';

const Index: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex relative p-16 gap-16">
      <motion.div
        className={`${
          BlurCardCss
        } flex flex-col justify-between items-center p-8 w-[12rem] h-[22rem]`}
        initial={{ x: -500 }}
        animate={{ x: 0 }}
      >
        <Button
          icon={IconSend}
          color="#ff7000"
          title="日常"
          size="large"
          onClick={() => navigate('/dashboard/daily')}
        />
        <Button
          icon={IconImage}
          color="#00cb59"
          title="图床"
          size="large"
          onClick={() => navigate('/dashboard/photo')}
        />
        <Button
          icon={IconCode}
          color="#00aaf4"
          title="Idea"
          size="large"
          onClick={() => navigate('/dashboard/idea')}
        />
        <Button
          icon={IconMail}
          color="#ef97ef"
          title="邮件"
          size="large"
          onClick={() => navigate('/dashboard/email')}
        />
      </motion.div>
      <div className={`${BlurCardCss} mx-8 flex-1`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Index;
