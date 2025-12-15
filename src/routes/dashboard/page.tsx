import { IconCode, IconImage, IconMail, IconSend } from '@douyinfe/semi-icons';
import { AnimatePresence, motion } from 'motion/react';
import Button from '@/component/button';

const Index: React.FC = () => {
  const a = 0;

  return (
    <div className="flex relative">
      <motion.div
        className="flex flex-col justify-between items-center p-8 m-16 rounded-xl backdrop-blur-md border border-gray-300 w-[12rem] h-[22rem]"
        initial={{ x: -500 }}
        animate={{ x: 0 }}
      >
        <Button icon={IconSend} color="#ff7000" title="日常" size="large" />
        <Button icon={IconImage} color="#00cb59" title="图床" size="large" />
        <Button icon={IconCode} color="#00aaf4" title="Idea" size="large" />
        <Button icon={IconMail} color="#ef97ef" title="邮件" size="large" />
      </motion.div>
      <div className="mt-16 mr-16 flex-1 rounded-xl backdrop-blur-md border border-gray-300  shadow-xl">
        右部
      </div>
    </div>
  );
};

export default Index;
