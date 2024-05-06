import React, { useState } from 'react';
import {
  HomeOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const HomeView: React.FC = () => {
  const [collapsed] = useState(false);
  const navigateTo = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const menuClick = (e: { key: string }) => {
    navigateTo(e.key);
  }

  return (
    <Layout>
      <div>
        <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: "100%" }}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={menuClick}
            items={[
              {
                key: '/HomePage',
                icon: <HomeOutlined />,
                label: 'Home',
              },
              {
                key: '/EventPage',
                icon: <StarOutlined />,
                label: 'Event',
              },
              {
                key: '/HelpPage',
                icon: <QuestionCircleOutlined />,
                label: 'Help',
              },
              {
                key: '/SettingPage',
                icon: <SettingOutlined />,
                label: 'Setting',
              },
            ]}
          />
        </Sider>
      </div>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer
            }}
          >
            <Outlet></Outlet>
          </Content>
        </Header>
      </Layout>
    </Layout>
  );
};

export default HomeView;