'use client';

import { useState, useEffect } from 'react';
import { Card, Button, List, Tag, Typography, Space, Avatar, Statistic, Row, Col } from 'antd';
import { 
  Truck, 
  MapPin, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  AlertCircle,
  LogOut,
  User
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

// Mock data for demonstration
const mockTasks = [
  {
    id: '1',
    customerName: 'John Smith',
    address: '123 Main St, City, State',
    serviceType: 'Take Out',
    scheduledTime: '2:00 PM',
    status: 'assigned',
    price: 25.00,
  },
  {
    id: '2',
    customerName: 'Jane Doe',
    address: '456 Oak Ave, City, State',
    serviceType: 'Return',
    scheduledTime: '3:30 PM',
    status: 'in_progress',
    price: 30.00,
  },
  {
    id: '3',
    customerName: 'Mike Johnson',
    address: '789 Pine Rd, City, State',
    serviceType: 'Round Trip',
    scheduledTime: '5:00 PM',
    status: 'completed',
    price: 45.00,
  },
];

const mockStats = {
  todayEarnings: 75.00,
  weeklyEarnings: 420.00,
  completedTasks: 12,
  pendingTasks: 3,
};

export default function DasherDashboard() {
  const { user, logout, isAuthenticated } = useAuthStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('tasks');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'blue';
      case 'in_progress': return 'orange';
      case 'completed': return 'green';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'assigned': return 'Assigned';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <Title level={4} className="!mb-0 text-green-600">
                  TrashDash
                </Title>
                <Text type="secondary" className="text-sm">
                  Dasher Portal
                </Text>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Avatar 
                icon={<User />} 
                className="bg-green-600"
              />
              <Button 
                type="text" 
                icon={<LogOut />} 
                onClick={handleLogout}
                size="small"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="max-w-md mx-auto px-4 py-6">
        <Card className="mb-6">
          <div className="text-center">
            <Title level={3} className="!mb-2">
              Welcome back, {user?.firstName}!
            </Title>
            <Text type="secondary">
              Ready to pick up some tasks?
            </Text>
          </div>
        </Card>

        {/* Stats Cards */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col span={12}>
            <Card className="text-center">
              <Statistic
                title="Today's Earnings"
                value={mockStats.todayEarnings}
                prefix={<DollarSign className="h-4 w-4" />}
                valueStyle={{ color: '#22c55e' }}
                formatter={(value) => `$${value}`}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card className="text-center">
              <Statistic
                title="Pending Tasks"
                value={mockStats.pendingTasks}
                prefix={<Clock className="h-4 w-4" />}
                valueStyle={{ color: '#f59e0b' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Tab Navigation */}
        <div className="flex mb-4 bg-white rounded-lg p-1 shadow-sm">
          <Button
            type={activeTab === 'tasks' ? 'primary' : 'text'}
            onClick={() => setActiveTab('tasks')}
            className="flex-1"
            size="large"
          >
            Tasks
          </Button>
          <Button
            type={activeTab === 'earnings' ? 'primary' : 'text'}
            onClick={() => setActiveTab('earnings')}
            className="flex-1"
            size="large"
          >
            Earnings
          </Button>
        </div>

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <Card>
            <Title level={4} className="!mb-4">
              Today's Tasks
            </Title>
            <List
              dataSource={mockTasks}
              renderItem={(task) => (
                <List.Item
                  className="border-b border-gray-100 last:border-b-0 py-4"
                  actions={[
                    <Button 
                      type="primary" 
                      size="small"
                      className="bg-green-600 hover:bg-green-700 border-0"
                    >
                      {task.status === 'assigned' ? 'Start Task' : 
                       task.status === 'in_progress' ? 'Update Status' : 'View Details'}
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        icon={<MapPin />} 
                        className="bg-blue-500"
                      />
                    }
                    title={
                      <div className="flex items-center justify-between">
                        <Text strong>{task.customerName}</Text>
                        <Tag color={getStatusColor(task.status)}>
                          {getStatusText(task.status)}
                        </Tag>
                      </div>
                    }
                    description={
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                          <Text type="secondary" className="text-sm">
                            {task.address}
                          </Text>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-gray-400" />
                            <Text type="secondary" className="text-sm">
                              {task.scheduledTime}
                            </Text>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-3 w-3 mr-1 text-green-500" />
                            <Text strong className="text-green-600">
                              ${task.price}
                            </Text>
                          </div>
                        </div>
                        <Text type="secondary" className="text-sm">
                          Service: {task.serviceType}
                        </Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <Card>
            <Title level={4} className="!mb-4">
              Earnings Overview
            </Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card className="text-center">
                  <Statistic
                    title="This Week"
                    value={mockStats.weeklyEarnings}
                    prefix={<DollarSign className="h-4 w-4" />}
                    valueStyle={{ color: '#22c55e' }}
                    formatter={(value) => `$${value}`}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card className="text-center">
                  <Statistic
                    title="Completed Tasks"
                    value={mockStats.completedTasks}
                    prefix={<CheckCircle className="h-4 w-4" />}
                    valueStyle={{ color: '#3b82f6' }}
                  />
                </Card>
              </Col>
            </Row>
            
            <div className="mt-6">
              <Title level={5} className="!mb-3">
                Recent Earnings
              </Title>
              <List
                size="small"
                dataSource={[
                  { date: 'Today', amount: 75.00, tasks: 3 },
                  { date: 'Yesterday', amount: 65.00, tasks: 2 },
                  { date: '2 days ago', amount: 80.00, tasks: 4 },
                ]}
                renderItem={(item) => (
                  <List.Item className="border-b border-gray-100 last:border-b-0 py-3">
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <Text strong>{item.date}</Text>
                        <br />
                        <Text type="secondary" className="text-sm">
                          {item.tasks} tasks completed
                        </Text>
                      </div>
                      <Text strong className="text-green-600">
                        ${item.amount}
                      </Text>
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
} 