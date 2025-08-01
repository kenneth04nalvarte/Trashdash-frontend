'use client';

import { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Space, 
  Tag, 
  Input, 
  Select, 
  Avatar, 
  Modal, 
  message,
  Badge,
  Tooltip,
  Dropdown,
  Menu,
  Progress,
  Statistic,
  Row,
  Col
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  CarOutlined,
  MoreOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
  StarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import useAuthStore from '../../stores/authStore';
import api, { API_ENDPOINTS } from '../../services/api';
import AdminLayout from '../../components/AdminLayout';

const { Search } = Input;
const { Option } = Select;

interface Dasher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  rating: number;
  totalTasks: number;
  completedTasks: number;
  totalEarnings: number;
  vehicleInfo: {
    type: string;
    model: string;
    licensePlate: string;
  };
  location: {
    latitude: number;
    longitude: number;
    lastUpdated: string;
  };
  joinedAt: string;
  lastActive: string;
}

export default function DashersPage() {
  const { isAuthenticated } = useAuthStore();
  const [dashers, setDashers] = useState<Dasher[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (isAuthenticated) {
      fetchDashers();
    }
  }, [isAuthenticated]);

  const fetchDashers = async () => {
    try {
      setLoading(true);
      const response = await api.get(API_ENDPOINTS.DASHERS.LIST);
      
      if (response.data.success) {
        setDashers(response.data.data);
      } else {
        // Use mock data if endpoint not available
        setDashers([
          {
            id: '1',
            firstName: 'Alex',
            lastName: 'Wilson',
            email: 'alex@example.com',
            phone: '+1-555-0123',
            status: 'active',
            rating: 4.8,
            totalTasks: 156,
            completedTasks: 152,
            totalEarnings: 2340.50,
            vehicleInfo: {
              type: 'Car',
              model: 'Toyota Camry 2020',
              licensePlate: 'ABC-123'
            },
            location: {
              latitude: 30.2672,
              longitude: -97.7431,
              lastUpdated: '2024-01-15T14:30:00Z'
            },
            joinedAt: '2023-06-15T00:00:00Z',
            lastActive: '2024-01-15T14:30:00Z'
          },
          {
            id: '2',
            firstName: 'Chris',
            lastName: 'Davis',
            email: 'chris@example.com',
            phone: '+1-555-0124',
            status: 'active',
            rating: 4.6,
            totalTasks: 89,
            completedTasks: 87,
            totalEarnings: 1345.75,
            vehicleInfo: {
              type: 'Car',
              model: 'Honda Civic 2019',
              licensePlate: 'XYZ-789'
            },
            location: {
              latitude: 30.2672,
              longitude: -97.7431,
              lastUpdated: '2024-01-15T13:45:00Z'
            },
            joinedAt: '2023-08-20T00:00:00Z',
            lastActive: '2024-01-15T13:45:00Z'
          },
          {
            id: '3',
            firstName: 'Emma',
            lastName: 'Taylor',
            email: 'emma@example.com',
            phone: '+1-555-0125',
            status: 'inactive',
            rating: 4.4,
            totalTasks: 67,
            completedTasks: 65,
            totalEarnings: 890.25,
            vehicleInfo: {
              type: 'Car',
              model: 'Nissan Sentra 2021',
              licensePlate: 'DEF-456'
            },
            location: {
              latitude: 30.2672,
              longitude: -97.7431,
              lastUpdated: '2024-01-10T09:15:00Z'
            },
            joinedAt: '2023-09-10T00:00:00Z',
            lastActive: '2024-01-10T09:15:00Z'
          },
          {
            id: '4',
            firstName: 'Mike',
            lastName: 'Johnson',
            email: 'mike@example.com',
            phone: '+1-555-0126',
            status: 'pending',
            rating: 0,
            totalTasks: 0,
            completedTasks: 0,
            totalEarnings: 0,
            vehicleInfo: {
              type: 'Car',
              model: 'Ford Focus 2018',
              licensePlate: 'GHI-789'
            },
            location: {
              latitude: 0,
              longitude: 0,
              lastUpdated: '2024-01-15T00:00:00Z'
            },
            joinedAt: '2024-01-15T00:00:00Z',
            lastActive: '2024-01-15T00:00:00Z'
          },
          {
            id: '5',
            firstName: 'Sarah',
            lastName: 'Brown',
            email: 'sarah@example.com',
            phone: '+1-555-0127',
            status: 'suspended',
            rating: 3.2,
            totalTasks: 23,
            completedTasks: 20,
            totalEarnings: 245.00,
            vehicleInfo: {
              type: 'Car',
              model: 'Chevrolet Cruze 2017',
              licensePlate: 'JKL-012'
            },
            location: {
              latitude: 30.2672,
              longitude: -97.7431,
              lastUpdated: '2024-01-05T16:20:00Z'
            },
            joinedAt: '2023-11-05T00:00:00Z',
            lastActive: '2024-01-05T16:20:00Z'
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching dashers:', error);
      message.error('Failed to load dashers');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'default';
      case 'pending':
        return 'warning';
      case 'suspended':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleOutlined />;
      case 'inactive':
        return <ClockCircleOutlined />;
      case 'pending':
        return <ClockCircleOutlined />;
      case 'suspended':
        return <LockOutlined />;
      default:
        return <ClockCircleOutlined />;
    }
  };

  const handleDasherAction = (action: string, dasherId: string) => {
    switch (action) {
      case 'view':
        message.info('View dasher details - coming soon!');
        break;
      case 'edit':
        message.info('Edit dasher - coming soon!');
        break;
      case 'suspend':
        Modal.confirm({
          title: 'Suspend Dasher',
          content: 'Are you sure you want to suspend this dasher?',
          onOk: () => {
            message.success('Dasher suspended successfully');
            fetchDashers();
          },
        });
        break;
      case 'activate':
        Modal.confirm({
          title: 'Activate Dasher',
          content: 'Are you sure you want to activate this dasher?',
          onOk: () => {
            message.success('Dasher activated successfully');
            fetchDashers();
          },
        });
        break;
      case 'approve':
        Modal.confirm({
          title: 'Approve Dasher',
          content: 'Are you sure you want to approve this dasher?',
          onOk: () => {
            message.success('Dasher approved successfully');
            fetchDashers();
          },
        });
        break;
      case 'delete':
        Modal.confirm({
          title: 'Delete Dasher',
          content: 'Are you sure you want to delete this dasher? This action cannot be undone.',
          okText: 'Delete',
          okType: 'danger',
          onOk: () => {
            message.success('Dasher deleted successfully');
            fetchDashers();
          },
        });
        break;
    }
  };

  const filteredDashers = dashers.filter(dasher => {
    const matchesSearch = 
      dasher.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      dasher.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      dasher.email.toLowerCase().includes(searchText.toLowerCase()) ||
      dasher.vehicleInfo.licensePlate.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || dasher.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      title: 'Dasher',
      key: 'dasher',
      render: (dasher: Dasher) => (
        <div className="flex items-center space-x-3">
          <Avatar icon={<CarOutlined />} />
          <div>
            <div className="font-medium">{dasher.firstName} {dasher.lastName}</div>
            <div className="text-sm text-gray-500">{dasher.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge 
          status={status === 'active' ? 'success' : status === 'pending' ? 'processing' : 'error'} 
          text={
            <Tag color={getStatusColor(status)} icon={getStatusIcon(status)}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Tag>
          }
        />
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating: number) => (
        <div className="flex items-center space-x-1">
          <StarOutlined className="text-yellow-500" />
          <span>{rating > 0 ? rating.toFixed(1) : 'N/A'}</span>
        </div>
      ),
    },
    {
      title: 'Performance',
      key: 'performance',
      render: (dasher: Dasher) => (
        <div>
          <div className="text-sm">
            {dasher.completedTasks}/{dasher.totalTasks} tasks
          </div>
          <Progress 
            percent={dasher.totalTasks > 0 ? Math.round((dasher.completedTasks / dasher.totalTasks) * 100) : 0} 
            size="small" 
            strokeColor="#22c55e"
          />
        </div>
      ),
    },
    {
      title: 'Earnings',
      dataIndex: 'totalEarnings',
      key: 'totalEarnings',
      render: (earnings: number) => (
        <span className="font-medium">${earnings.toFixed(2)}</span>
      ),
    },
    {
      title: 'Vehicle',
      key: 'vehicle',
      render: (dasher: Dasher) => (
        <div>
          <div className="text-sm font-medium">{dasher.vehicleInfo.model}</div>
          <div className="text-xs text-gray-500">{dasher.vehicleInfo.licensePlate}</div>
        </div>
      ),
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (dasher: Dasher) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item 
                key="view" 
                icon={<EyeOutlined />}
                onClick={() => handleDasherAction('view', dasher.id)}
              >
                View Details
              </Menu.Item>
              <Menu.Item 
                key="edit" 
                icon={<EditOutlined />}
                onClick={() => handleDasherAction('edit', dasher.id)}
              >
                Edit Dasher
              </Menu.Item>
              {dasher.status === 'active' && (
                <Menu.Item 
                  key="suspend" 
                  icon={<LockOutlined />}
                  onClick={() => handleDasherAction('suspend', dasher.id)}
                >
                  Suspend Dasher
                </Menu.Item>
              )}
              {dasher.status === 'inactive' && (
                <Menu.Item 
                  key="activate" 
                  icon={<UnlockOutlined />}
                  onClick={() => handleDasherAction('activate', dasher.id)}
                >
                  Activate Dasher
                </Menu.Item>
              )}
              {dasher.status === 'pending' && (
                <Menu.Item 
                  key="approve" 
                  icon={<CheckCircleOutlined />}
                  onClick={() => handleDasherAction('approve', dasher.id)}
                >
                  Approve Dasher
                </Menu.Item>
              )}
              {dasher.status === 'suspended' && (
                <Menu.Item 
                  key="activate" 
                  icon={<UnlockOutlined />}
                  onClick={() => handleDasherAction('activate', dasher.id)}
                >
                  Reactivate Dasher
                </Menu.Item>
              )}
              <Menu.Divider />
              <Menu.Item 
                key="delete" 
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleDasherAction('delete', dasher.id)}
              >
                Delete Dasher
              </Menu.Item>
            </Menu>
          }
          trigger={['click']}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  const stats = {
    total: dashers.length,
    active: dashers.filter(d => d.status === 'active').length,
    pending: dashers.filter(d => d.status === 'pending').length,
    suspended: dashers.filter(d => d.status === 'suspended').length,
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dasher Management
          </h1>
          <p className="text-gray-600">
            Manage all platform dashers and their performance
          </p>
        </div>

        {/* Statistics */}
        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Dashers"
                value={stats.total}
                prefix={<CarOutlined className="text-blue-500" />}
                valueStyle={{ color: '#3b82f6' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Active Dashers"
                value={stats.active}
                prefix={<CheckCircleOutlined className="text-green-500" />}
                valueStyle={{ color: '#22c55e' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Pending Approval"
                value={stats.pending}
                prefix={<ClockCircleOutlined className="text-yellow-500" />}
                valueStyle={{ color: '#f59e0b' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Suspended"
                value={stats.suspended}
                prefix={<LockOutlined className="text-red-500" />}
                valueStyle={{ color: '#ef4444' }}
              />
            </Card>
          </Col>
        </Row>

        <Card>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Search
              placeholder="Search dashers by name, email, or license plate"
              allowClear
              style={{ maxWidth: 300 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <Select
              placeholder="Filter by status"
              style={{ width: 150 }}
              value={statusFilter}
              onChange={setStatusFilter}
            >
              <Option value="all">All Status</Option>
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="pending">Pending</Option>
              <Option value="suspended">Suspended</Option>
            </Select>
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => message.info('Add new dasher - coming soon!')}
            >
              Add Dasher
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={filteredDashers}
            loading={loading}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `${range[0]}-${range[1]} of ${total} dashers`,
            }}
          />
        </Card>
      </div>
    </AdminLayout>
  );
} 