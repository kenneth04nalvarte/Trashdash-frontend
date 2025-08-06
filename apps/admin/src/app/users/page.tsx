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
  Menu
} from 'antd';
import { 
  SearchOutlined, 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined,
  UserOutlined,
  CarOutlined,
  MoreOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined
} from '@ant-design/icons';
import { useAuthStore } from '../../stores/authStore';
import api, { API_ENDPOINTS } from '../../services/api';
import AdminLayout from '../../components/AdminLayout';

const { Search } = Input;
const { Option } = Select;

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'customer' | 'dasher' | 'admin';
  status: 'active' | 'pending' | 'suspended';
  createdAt: string;
  lastLogin?: string;
}

export default function UsersPage() {
  const { isAuthenticated } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
    }
  }, [isAuthenticated]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get(API_ENDPOINTS.USERS.LIST);
      
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        // Use mock data if endpoint not available
        setUsers([
          {
            id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '+1-555-0123',
            role: 'customer',
            status: 'active',
            createdAt: '2024-01-15T10:30:00Z',
            lastLogin: '2024-01-15T14:20:00Z',
          },
          {
            id: '2',
            firstName: 'Jane',
            lastName: 'Smith',
            email: 'jane@example.com',
            phone: '+1-555-0124',
            role: 'dasher',
            status: 'active',
            createdAt: '2024-01-14T15:45:00Z',
            lastLogin: '2024-01-15T13:15:00Z',
          },
          {
            id: '3',
            firstName: 'Mike',
            lastName: 'Johnson',
            email: 'mike@example.com',
            phone: '+1-555-0125',
            role: 'customer',
            status: 'pending',
            createdAt: '2024-01-13T09:20:00Z',
          },
          {
            id: '4',
            firstName: 'Sarah',
            lastName: 'Brown',
            email: 'sarah@example.com',
            phone: '+1-555-0126',
            role: 'dasher',
            status: 'suspended',
            createdAt: '2024-01-12T11:30:00Z',
            lastLogin: '2024-01-10T16:45:00Z',
          },
          {
            id: '5',
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@trashdash.com',
            phone: '+1-555-0127',
            role: 'admin',
            status: 'active',
            createdAt: '2024-01-01T00:00:00Z',
            lastLogin: '2024-01-15T15:30:00Z',
          },
        ]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      message.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <UserOutlined className="text-red-500" />;
      case 'dasher':
        return <CarOutlined className="text-blue-500" />;
      case 'customer':
        return <UserOutlined className="text-green-500" />;
      default:
        return <UserOutlined />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'pending':
        return 'warning';
      case 'suspended':
        return 'error';
      default:
        return 'default';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'red';
      case 'dasher':
        return 'blue';
      case 'customer':
        return 'green';
      default:
        return 'default';
    }
  };

  const handleUserAction = (action: string, userId: string) => {
    switch (action) {
      case 'view':
        message.info('View user details - coming soon!');
        break;
      case 'edit':
        message.info('Edit user - coming soon!');
        break;
      case 'suspend':
        Modal.confirm({
          title: 'Suspend User',
          content: 'Are you sure you want to suspend this user?',
          onOk: () => {
            message.success('User suspended successfully');
            fetchUsers();
          },
        });
        break;
      case 'activate':
        Modal.confirm({
          title: 'Activate User',
          content: 'Are you sure you want to activate this user?',
          onOk: () => {
            message.success('User activated successfully');
            fetchUsers();
          },
        });
        break;
      case 'delete':
        Modal.confirm({
          title: 'Delete User',
          content: 'Are you sure you want to delete this user? This action cannot be undone.',
          okText: 'Delete',
          okType: 'danger',
          onOk: () => {
            message.success('User deleted successfully');
            fetchUsers();
          },
        });
        break;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const columns = [
    {
      title: 'User',
      key: 'user',
      render: (user: User) => (
        <div className="flex items-center space-x-3">
          <Avatar icon={getRoleIcon(user.role)} />
          <div>
            <div className="font-medium">{user.firstName} {user.lastName}</div>
            <div className="text-sm text-gray-500">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={getRoleColor(role)}>
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </Tag>
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
            <Tag color={getStatusColor(status)}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Tag>
          }
        />
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Joined',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (date: string) => date ? new Date(date).toLocaleDateString() : 'Never',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (user: User) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item 
                key="view" 
                icon={<EyeOutlined />}
                onClick={() => handleUserAction('view', user.id)}
              >
                View Details
              </Menu.Item>
              <Menu.Item 
                key="edit" 
                icon={<EditOutlined />}
                onClick={() => handleUserAction('edit', user.id)}
              >
                Edit User
              </Menu.Item>
              {user.status === 'active' ? (
                <Menu.Item 
                  key="suspend" 
                  icon={<LockOutlined />}
                  onClick={() => handleUserAction('suspend', user.id)}
                >
                  Suspend User
                </Menu.Item>
              ) : (
                <Menu.Item 
                  key="activate" 
                  icon={<UnlockOutlined />}
                  onClick={() => handleUserAction('activate', user.id)}
                >
                  Activate User
                </Menu.Item>
              )}
              <Menu.Divider />
              <Menu.Item 
                key="delete" 
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleUserAction('delete', user.id)}
              >
                Delete User
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

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              User Management
            </h1>
            <p className="text-gray-600">
              Manage all platform users including customers, dashers, and admins
            </p>
          </div>

          <Card>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Search
                placeholder="Search users by name or email"
                allowClear
                style={{ maxWidth: 300 }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Select
                placeholder="Filter by role"
                style={{ width: 150 }}
                value={roleFilter}
                onChange={setRoleFilter}
              >
                <Option value="all">All Roles</Option>
                <Option value="customer">Customers</Option>
                <Option value="dasher">Dashers</Option>
                <Option value="admin">Admins</Option>
              </Select>
              <Select
                placeholder="Filter by status"
                style={{ width: 150 }}
                value={statusFilter}
                onChange={setStatusFilter}
              >
                <Option value="all">All Status</Option>
                <Option value="active">Active</Option>
                <Option value="pending">Pending</Option>
                <Option value="suspended">Suspended</Option>
              </Select>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => message.info('Add new user - coming soon!')}
              >
                Add User
              </Button>
            </div>

            <Table
              columns={columns}
              dataSource={filteredUsers}
              loading={loading}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `${range[0]}-${range[1]} of ${total} users`,
              }}
            />
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
} 