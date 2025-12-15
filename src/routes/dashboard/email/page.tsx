import React from 'react';
import { Typography } from '@douyinfe/semi-ui';
const { Title, Text } = Typography;

const EmailPage: React.FC = () => (
  <div className="p-8">
    <Title heading={3}>邮件</Title>
    <div>
      <div className="flex items-center gap-4 m-2">
        <Text link>收件箱</Text>
        {/* <div>|</div> */}
        <Text link>发件箱</Text>
        {/* <div>|</div> */}
        <Text link>写信</Text>
      </div>
      {/* <div>组件</div> */}
    </div>
  </div>
);

export default EmailPage;
