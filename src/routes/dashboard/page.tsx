import { IconCode, IconImage, IconSend } from '@douyinfe/semi-icons';
import style from './index.module.scss';

const Index: React.FC = () => {
  const a = 0;

  return (
    <div className="flex flex-col gap-4 justify-start items-start p-4">
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
    </div>
  );
};

export default Index;
