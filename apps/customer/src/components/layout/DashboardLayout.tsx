'use client';

import { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Badge } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  CalendarOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '../../stores/authStore';
import Link from 'next/link';

const { Header, Sider, Content } = Layout;

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    key: '/book-service',
    icon: <CalendarOutlined />,
    label: 'Book Service',
  },
  {
    key: '/tasks',
    icon: <HomeOutlined />,
    label: 'My Tasks',
  },
  {
    key: '/addresses',
    icon: <EnvironmentOutlined />,
    label: 'Addresses',
  },
  {
    key: '/payments',
    icon: <CreditCardOutlined />,
    label: 'Payments',
  },
  {
    key: '/profile',
    icon: <UserOutlined />,
    label: 'Profile',
  },
  {
    key: '/settings',
    icon: <SettingOutlined />,
    label: 'Settings',
  },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => router.push('/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => router.push('/settings'),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className="min-h-screen">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="bg-white border-r border-gray-200"
        width={250}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            {!collapsed && (
              <span className="text-xl font-bold text-gray-900">TrashDash</span>
            )}
          </div>
        </div>
        
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          className="border-0"
          onClick={({ key }) => router.push(key)}
        />
      </Sider>
      
      <Layout>
        <Header className="bg-white border-b border-gray-200 px-6 flex items-center justify-between">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-lg"
          />
          
          <div className="flex items-center space-x-4">
            <Badge count={3} size="small">
              <Button 
                type="text" 
                icon={<BellOutlined />} 
                className="text-lg"
                onClick={() => router.push('/notifications')}
              />
            </Badge>
            
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={['click']}
            >
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg">
                <Avatar 
                  src={user?.profilePhoto}
                  icon={<UserOutlined />}
                  className="bg-primary-600"
                />
                {!collapsed && (
                  <div className="hidden md:block">
                    <div className="text-sm font-medium text-gray-900">
                      {user?.firstName} {user?.lastName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {user?.email}
                    </div>
                  </div>
                )}
              </div>
            </Dropdown>
          </div>
        </Header>
        
        <Content className="bg-gray-50">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
} 