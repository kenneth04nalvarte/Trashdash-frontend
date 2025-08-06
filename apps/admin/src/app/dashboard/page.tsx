'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Button, 
  Table, 
  Tag, 
  Space, 
  Avatar, 
  Progress,
  List,
  Badge,
  message,
  Dropdown,
  Menu
} from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  CarOutlined, 
  DollarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  MoreOutlined,
  LogoutOutlined,
  SettingOutlined,
  BarChartOutlined,
  UserSwitchOutlined,
  FileTextOutlined,
  BellOutlined
} from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuthStore } from '../../stores/authStore';
import api, { API_ENDPOINTS } from '../../services/api';
import AdminLayout from '../../components/AdminLayout';

interface DashboardData {
  stats: {
    totalUsers: number;
    totalDashers: number;
    totalCustomers: number;
    totalRevenue: number;
    pendingTasks: number;
    completedTasks: number;
    activeDashers: number;
    customerSatisfaction: number;
  };
  recentUsers: Array<{
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
  }>;
  recentTasks: Array<{
    id: string;
    serviceType: string;
    status: string;
    customer: string;
    dasher: string;
    amount: number;
    createdAt: string;
  }>;
  revenueData: Array<{
    date: string;
    revenue: number;
  }>;
  taskStatusData: Array<{
    status: string;
    count: number;
    color: string;
  }>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function AdminDashboardPage() {
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
      const response = await api.get(API_ENDPOINTS.ADMIN.DASHBOARD);
      
      if (response.data.success) {
        setDashboardData(response.data.data);
      } else {
        // Use mock data if endpoint not available
        console.log('Admin dashboard endpoint not available, using mock data');
        setDashboardData({
          stats: {
            totalUsers: 1250,
            totalDashers: 45,
            totalCustomers: 1205,
            totalRevenue: 15420.50,
            pendingTasks: 23,
            completedTasks: 892,
            activeDashers: 38,
            customerSatisfaction: 4.7,
          },
          recentUsers: [
            {
              id: '1',
              name: 'John Doe',
              email: 'john@example.com',
              role: 'customer',
              status: 'active',
              createdAt: '2024-01-15T10:30:00Z',
            },
            {
              id: '2',
              name: 'Jane Smith',
              email: 'jane@example.com',
              role: 'dasher',
              status: 'active',
              createdAt: '2024-01-14T15:45:00Z',
            },
            {
              id: '3',
              name: 'Mike Johnson',
              email: 'mike@example.com',
              role: 'customer',
              status: 'pending',
              createdAt: '2024-01-13T09:20:00Z',
            },
          ],
          recentTasks: [
            {
              id: '1',
              serviceType: 'take_out',
              status: 'completed',
              customer: 'John Doe',
              dasher: 'Alex Wilson',
              amount: 15.00,
              createdAt: '2024-01-15T08:00:00Z',
            },
            {
              id: '2',
              serviceType: 'wash',
              status: 'in_progress',
              customer: 'Sarah Brown',
              dasher: 'Chris Davis',
              amount: 20.00,
              createdAt: '2024-01-15T07:30:00Z',
            },
            {
              id: '3',
              serviceType: 'take_out',
              status: 'pending',
              customer: 'Lisa Green',
              dasher: 'Unassigned',
              amount: 15.00,
              createdAt: '2024-01-15T07:00:00Z',
            },
          ],
          revenueData: [
            { date: 'Jan 10', revenue: 1200 },
            { date: 'Jan 11', revenue: 1350 },
            { date: 'Jan 12', revenue: 1100 },
            { date: 'Jan 13', revenue: 1400 },
            { date: 'Jan 14', revenue: 1600 },
            { date: 'Jan 15', revenue: 1800 },
          ],
          taskStatusData: [
            { status: 'Completed', count: 892, color: '#00C49F' },
            { status: 'In Progress', count: 45, color: '#FFBB28' },
            { status: 'Pending', count: 23, color: '#FF8042' },
            { status: 'Cancelled', count: 12, color: '#FF0000' },
          ],
        });
      }
    } catch (error: any) {
      console.error('Admin dashboard error:', error);
      // Use mock data if API is not available
      setDashboardData({
        stats: {
          totalUsers: 1250,
          totalDashers: 45,
          totalCustomers: 1205,
          totalRevenue: 15420.50,
          pendingTasks: 23,
          completedTasks: 892,
          activeDashers: 38,
          customerSatisfaction: 4.7,
        },
        recentUsers: [
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'customer',
            status: 'active',
            createdAt: '2024-01-15T10:30:00Z',
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'dasher',
            status: 'active',
            createdAt: '2024-01-14T15:45:00Z',
          },
          {
            id: '3',
            name: 'Mike Johnson',
            email: 'mike@example.com',
            role: 'customer',
            status: 'pending',
            createdAt: '2024-01-13T09:20:00Z',
          },
        ],
        recentTasks: [
          {
            id: '1',
            serviceType: 'take_out',
            status: 'completed',
            customer: 'John Doe',
            dasher: 'Alex Wilson',
            amount: 15.00,
            createdAt: '2024-01-15T08:00:00Z',
          },
          {
            id: '2',
            serviceType: 'wash',
            status: 'in_progress',
            customer: 'Sarah Brown',
            dasher: 'Chris Davis',
            amount: 20.00,
            createdAt: '2024-01-15T07:30:00Z',
          },
          {
            id: '3',
            serviceType: 'take_out',
            status: 'pending',
            customer: 'Lisa Green',
            dasher: 'Unassigned',
            amount: 15.00,
            createdAt: '2024-01-15T07:00:00Z',
          },
        ],
        revenueData: [
          { date: 'Jan 10', revenue: 1200 },
          { date: 'Jan 11', revenue: 1350 },
          { date: 'Jan 12', revenue: 1100 },
          { date: 'Jan 13', revenue: 1400 },
          { date: 'Jan 14', revenue: 1600 },
          { date: 'Jan 15', revenue: 1800 },
        ],
        taskStatusData: [
          { status: 'Completed', count: 892, color: '#00C49F' },
          { status: 'In Progress', count: 45, color: '#FFBB28' },
          { status: 'Pending', count: 23, color: '#FF8042' },
          { status: 'Cancelled', count: 12, color: '#FF0000' },
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
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'suspended':
        return 'error';
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'processing';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return <CheckCircleOutlined />;
      case 'pending':
        return <ClockCircleOutlined />;
      case 'in_progress':
        return <ClockCircleOutlined />;
      case 'suspended':
      case 'cancelled':
        return <ExclamationCircleOutlined />;
      default:
        return <ClockCircleOutlined />;
    }
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

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading admin dashboard...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!dashboardData) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Unable to load dashboard data</p>
            <Button onClick={fetchDashboardData} className="mt-4">
              Retry
            </Button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h2>
          <p className="text-gray-600">
            Platform overview and management controls
          </p>
        </div>

        {/* Key Statistics */}
        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Users"
                value={dashboardData.stats.totalUsers}
                prefix={<UserOutlined className="text-blue-500" />}
                valueStyle={{ color: '#3b82f6' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Active Dashers"
                value={dashboardData.stats.activeDashers}
                prefix={<CarOutlined className="text-green-500" />}
                valueStyle={{ color: '#22c55e' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Revenue"
                value={dashboardData.stats.totalRevenue}
                prefix={<DollarOutlined className="text-green-500" />}
                valueStyle={{ color: '#22c55e' }}
                formatter={(value) => `$${value}`}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Customer Satisfaction"
                value={dashboardData.stats.customerSatisfaction}
                suffix="/ 5.0"
                valueStyle={{ color: '#f59e0b' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Charts Row */}
        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={24} lg={16}>
            <Card title="Revenue Trend" className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dashboardData.revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                  <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Task Status Distribution" className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dashboardData.taskStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {dashboardData.taskStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>

        {/* Recent Activity */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Card 
              title="Recent Users" 
              extra={<Button type="link">View All</Button>}
              className="chart-container"
            >
              <List
                dataSource={dashboardData.recentUsers}
                renderItem={(user) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={user.name}
                      description={user.email}
                    />
                    <div className="text-right">
                      <Tag color={getStatusColor(user.status)}>
                        {user.status}
                      </Tag>
                      <div className="text-xs text-gray-500 mt-1">
                        {user.role}
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card 
              title="Recent Tasks" 
              extra={<Button type="link">View All</Button>}
              className="chart-container"
            >
              <List
                dataSource={dashboardData.recentTasks}
                renderItem={(task) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar 
                          icon={getStatusIcon(task.status)}
                          style={{ backgroundColor: getStatusColor(task.status) === 'success' ? '#22c55e' : '#f59e0b' }}
                        />
                      }
                      title={`${task.serviceType.replace('_', ' ')} - ${task.customer}`}
                      description={`Dasher: ${task.dasher}`}
                    />
                    <div className="text-right">
                      <div className="font-medium">${task.amount}</div>
                      <Tag color={getStatusColor(task.status)}>
                        {task.status.replace('_', ' ')}
                      </Tag>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Row gutter={[16, 16]} className="mt-8">
          <Col span={24}>
            <Card title="Quick Actions" className="chart-container">
              <Space wrap>
                <Button 
                  type="primary" 
                  icon={<UserSwitchOutlined />}
                  size="large"
                  onClick={() => router.push('/users')}
                >
                  Manage Users
                </Button>
                <Button 
                  icon={<FileTextOutlined />}
                  size="large"
                  onClick={() => router.push('/tasks')}
                >
                  Manage Tasks
                </Button>
                <Button 
                  icon={<BarChartOutlined />}
                  size="large"
                  onClick={() => router.push('/reports')}
                >
                  View Reports
                </Button>
                <Button 
                  icon={<SettingOutlined />}
                  size="large"
                  onClick={() => message.info('Settings coming soon!')}
                >
                  System Settings
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
} 