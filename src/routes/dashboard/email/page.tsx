import React, { useState, useEffect } from 'react';
import { Typography, Table } from '@douyinfe/semi-ui';
import { get as getEmailList } from '@api/email';
import type { Email } from 'api/model/email';

const { Title, Text } = Typography;

type EmailPageTab = 'inbox' | 'sent' | 'compose';

const EmailPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<EmailPageTab>('inbox');
  const [inboxEmails, setInboxEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(false);

  const handleTabClick = (tab: EmailPageTab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchInboxEmails = async () => {
      if (activeTab === 'inbox') {
        setLoading(true);
        try {
          const res = await getEmailList({ query: { emailType: 'received' } });
          if (res.code === 0 && res.data) {
            // API 返回的数据结构是 { message: string; data: Email[] }
            const emailData = res.data as { data?: Email[] };
            const emails = Array.isArray(emailData.data) ? emailData.data : [];
            setInboxEmails(emails);
          }
        } catch (error) {
          console.error('获取收件箱失败:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchInboxEmails();
  }, [activeTab]);

  const columns = [
    {
      title: '发件人',
      dataIndex: 'sender',
      key: 'sender',
      width: 150,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
      render: (text: string) => <span style={{ color: '#666' }}>{text}</span>,
    },
    {
      title: '状态',
      dataIndex: 'isRead',
      key: 'isRead',
      width: 80,
      render: (isRead: boolean) => (
        <span style={{ color: isRead ? '#999' : '#1890ff' }}>
          {isRead ? '已读' : '未读'}
        </span>
      ),
    },
  ];

  return (
    <div className="p-8">
      <Title heading={3}>邮件</Title>
      <div>
        <div className="flex items-center gap-4 m-2">
          <Text
            link
            onClick={() => handleTabClick('inbox')}
            style={{
              fontWeight: activeTab === 'inbox' ? 'bold' : 'normal',
            }}
          >
            收件箱
          </Text>
          <Text
            link
            onClick={() => handleTabClick('sent')}
            style={{
              fontWeight: activeTab === 'sent' ? 'bold' : 'normal',
            }}
          >
            发件箱
          </Text>
          <Text
            link
            onClick={() => handleTabClick('compose')}
            style={{
              fontWeight: activeTab === 'compose' ? 'bold' : 'normal',
            }}
          >
            写信
          </Text>
        </div>
        <div>
          {activeTab === 'inbox' && (
            <Table
              columns={columns}
              dataSource={inboxEmails}
              loading={loading}
              pagination={{
                pageSize: 10,
              }}
              rowKey="_id"
            />
          )}
          {activeTab === 'sent' && <div>发件箱内容</div>}
          {activeTab === 'compose' && <div>写信内容</div>}
        </div>
      </div>
    </div>
  );
};

export default EmailPage;
