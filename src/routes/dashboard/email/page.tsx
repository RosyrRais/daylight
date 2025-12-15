import React from 'react';
import { Typography } from '@douyinfe/semi-ui';
const { Title } = Typography;

const EmailPage: React.FC = () => (
  <div className="p-8">
    <Title heading={3}>邮件</Title>
    <div>{/* 邮件内容区域 */}</div>
  </div>
);

export default EmailPage;
