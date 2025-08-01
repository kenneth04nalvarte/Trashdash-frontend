'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Layout, 
  Menu, 
  Button, 
  Avatar, 
  Dropdown, 
  Badge,
  Space
} from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  CarOutlined,
  FileTextOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import useAuthStore from '../stores/authStore';

const { Header, Sider, Content } = Layout;

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Profile Settings',
      icon: <UserOutlined />,
    },
    {
      key: 'settings',
      label: 'System Settings',
      icon: <SettingOutlined />,
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: 'User Management',
    },
    {
      key: '/dashers',
      icon: <CarOutlined />,
      label: 'Dasher Management',
    },
    {
      key: '/tasks',
      icon: <FileTextOutlined />,
      label: 'Task Management',
    },
    {
      key: '/reports',
      icon: <BarChartOutlined />,
      label: 'Reports & Analytics',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'System Settings',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    router.push(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="admin-sidebar"
        width={250}
      >
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <SafetyOutlined className="text-gray-800 text-lg" />
            </div>
            {!collapsed && (
              <h1 className="text-white font-bold text-lg">TrashDash Admin</h1>
            )}
          </div>
        </div>
        
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          className="admin-sidebar-menu"
        />
      </Sider>
      
      <Layout>
        <Header className="admin-header px-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-gray-600"
            />
            <h2 className="text-lg font-semibold text-gray-800">
              {menuItems.find(item => item.key === pathname)?.label || 'Admin Panel'}
            </h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge count={5} size="small">
              <Button 
                icon={<BellOutlined />} 
                type="text" 
                className="text-gray-600"
              />
            </Badge>
            
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg">
                <Avatar 
                  src={user?.profilePhoto} 
                  icon={<UserOutlined />} 
                  className="bg-gray-800"
                />
                <span className="text-gray-700">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
            </Dropdown>
          </div>
        </Header>
        
        <Content className="admin-content">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
} 