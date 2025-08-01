'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Row, Col, Button, Statistic, List, Avatar, Tag, Space, message } from 'antd';
import { 
  PlusOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined,
  UserOutlined,
  CalendarOutlined,
  DollarOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import useAuthStore from '../../stores/authStore';
import api, { API_ENDPOINTS } from '../../services/api';

interface Task {
  id: string;
  serviceType: string;
  status: string;
  scheduledDate: string;
  scheduledTime: string;
  price: number;
  address: {
    formattedAddress: string;
  };
  createdAt: string;
}

interface DashboardData {
  stats: {
    pendingTasks: number;
    completedTasks: number;
    totalSpent: number;
    thisMonth: number;
  };
  recentTasks: Task[];
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get(API_ENDPOINTS.CUSTOMER.DASHBOARD);
      
      if (response.data.success) {
        setDashboardData(response.data.data);
      } else {
        // If the endpoint doesn't exist yet, use mock data
        console.log('Dashboard endpoint not available, using mock data');
        setDashboardData({
          stats: {
            pendingTasks: 2,
            completedTasks: 15,
            totalSpent: 125.50,
            thisMonth: 45.00,
          },
          recentTasks: [
            {
              id: '1',
              serviceType: 'take_out',
              status: 'pending',
              scheduledDate: '2024-01-15',
              scheduledTime: '09:00',
              price: 15.00,
              address: {
                formattedAddress: '123 Main St, Austin, TX 78701',
              },
              createdAt: '2024-01-10T00:00:00Z',
            },
            {
              id: '2',
              serviceType: 'wash',
              status: 'completed',
              scheduledDate: '2024-01-10',
              scheduledTime: '14:00',
              price: 20.00,
              address: {
                formattedAddress: '123 Main St, Austin, TX 78701',
              },
              createdAt: '2024-01-05T00:00:00Z',
            },
          ],
        });
      }
    } catch (error: any) {
      console.error('Dashboard error:', error);
      // Use mock data if API is not available
      console.log('Using mock dashboard data due to API error');
      setDashboardData({
        stats: {
          pendingTasks: 2,
          completedTasks: 15,
          totalSpent: 125.50,
          thisMonth: 45.00,
        },
        recentTasks: [
          {
            id: '1',
            serviceType: 'take_out',
            status: 'pending',
            scheduledDate: '2024-01-15',
            scheduledTime: '09:00',
            price: 15.00,
            address: {
              formattedAddress: '123 Main St, Austin, TX 78701',
            },
            createdAt: '2024-01-10T00:00:00Z',
          },
          {
            id: '2',
            serviceType: 'wash',
            status: 'completed',
            scheduledDate: '2024-01-10',
            scheduledTime: '14:00',
            price: 20.00,
            address: {
              formattedAddress: '123 Main St, Austin, TX 78701',
            },
            createdAt: '2024-01-05T00:00:00Z',
          },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'assigned':
        return 'processing';
      case 'in_progress':
        return 'processing';
      case 'completed':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <ClockCircleOutlined />;
      case 'assigned':
      case 'in_progress':
        return <ClockCircleOutlined />;
      case 'completed':
        return <CheckCircleOutlined />;
      case 'cancelled':
        return <ClockCircleOutlined />;
      default:
        return <ClockCircleOutlined />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Ensure dashboardData exists before rendering
  if (!dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Unable to load dashboard data</p>
          <Button onClick={fetchDashboardData} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">TrashDash</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Welcome, {user?.firstName} {user?.lastName}
            </span>
            <Button 
              icon={<LogoutOutlined />} 
              onClick={handleLogout}
              size="small"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your trash bin services
          </p>
        </div>

        {/* Stats Cards */}
        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Pending Tasks"
                value={dashboardData.stats?.pendingTasks || 0}
                prefix={<ClockCircleOutlined className="text-yellow-500" />}
                valueStyle={{ color: '#f59e0b' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Completed Tasks"
                value={dashboardData.stats?.completedTasks || 0}
                prefix={<CheckCircleOutlined className="text-green-500" />}
                valueStyle={{ color: '#22c55e' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Spent"
                value={dashboardData.stats?.totalSpent || 0}
                prefix={<DollarOutlined className="text-green-500" />}
                valueStyle={{ color: '#22c55e' }}
                formatter={(value) => `$${value}`}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="This Month"
                value={dashboardData.stats?.thisMonth || 0}
                prefix={<CalendarOutlined className="text-blue-500" />}
                valueStyle={{ color: '#3b82f6' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Row gutter={[16, 16]} className="mb-8">
          <Col span={24}>
            <Card title="Quick Actions" className="shadow-sm">
              <Space wrap>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  size="large"
                  onClick={() => message.info('Service booking coming soon!')}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Book New Service
                </Button>
                <Button 
                  icon={<UserOutlined />}
                  size="large"
                  onClick={() => message.info('Profile management coming soon!')}
                >
                  Update Profile
                </Button>
                <Button 
                  icon={<CalendarOutlined />}
                  size="large"
                  onClick={() => message.info('Address management coming soon!')}
                >
                  Manage Addresses
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Recent Tasks */}
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card 
              title="Recent Tasks" 
              extra={
                <Button type="link" onClick={() => message.info('Task list coming soon!')}>
                  View All
                </Button>
              }
              className="shadow-sm"
            >
              {dashboardData.recentTasks && dashboardData.recentTasks.length > 0 ? (
                <List
                  dataSource={dashboardData.recentTasks.slice(0, 5)}
                  renderItem={(task) => (
                    <List.Item
                      actions={[
                        <Button 
                          type="link" 
                          onClick={() => message.info('Task details coming soon!')}
                        >
                          View Details
                        </Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar 
                            icon={getStatusIcon(task.status)}
                            style={{ backgroundColor: getStatusColor(task.status) === 'success' ? '#22c55e' : '#f59e0b' }}
                          />
                        }
                        title={
                          <div className="flex items-center gap-2">
                            <span className="capitalize">{task.serviceType.replace('_', ' ')}</span>
                            <Tag color={getStatusColor(task.status)}>
                              {task.status.replace('_', ' ')}
                            </Tag>
                          </div>
                        }
                        description={
                          <div className="space-y-1">
                            <div className="text-gray-600">
                              {task.address.formattedAddress}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(task.scheduledDate).toLocaleDateString()} at {task.scheduledTime} • ${task.price}
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No tasks found. Book your first service to get started!</p>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
} 