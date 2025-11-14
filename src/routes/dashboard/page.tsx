import { IconCode, IconImage, IconSend } from '@douyinfe/semi-icons';
import style from './index.module.scss';
import { AnimatePresence, motion } from 'motion/react';

const Index: React.FC = () => {
  const a = 0;

  return (
    <div className="flex relative">
      <motion.div
        className="flex flex-col justify-between items-center p-8 m-16 rounded-xl backdrop-blur-md border border-gray-300 w-[12rem] h-[18rem]"
        initial={{ x: -500 }}
        animate={{ x: 0 }}
      >
        <div className={style['circle-1']}>
          <IconSend size="inherit" />
          <span>日常</span>
        </div>
        <div className={style['circle-2']}>
          <IconImage size="inherit" />
          <span>图床</span>
        </div>
        <div className={style['circle-3']}>
          <IconCode size="inherit" />
          <span>idea</span>
        </div>
      </motion.div>
      <div className="mt-16 mr-16 flex-1 rounded-xl backdrop-blur-md border border-gray-300  shadow-xl">
        右部
      </div>
    </div>
  );
};

export default Index;
