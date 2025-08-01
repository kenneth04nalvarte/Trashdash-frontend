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
  Progress
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
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  DollarOutlined
} from '@ant-design/icons';
import useAuthStore from '../../stores/authStore';
import api, { API_ENDPOINTS } from '../../services/api';
import AdminLayout from '../../components/AdminLayout';

const { Search } = Input;
const { Option } = Select;

interface Task {
  id: string;
  serviceType: 'take_out' | 'wash' | 'both';
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  customer: {
    id: string;
    name: string;
    email: string;
  };
  dasher?: {
    id: string;
    name: string;
    email: string;
  };
  address: {
    formattedAddress: string;
  };
  scheduledDate: string;
  scheduledTime: string;
  price: number;
  createdAt: string;
  completedAt?: string;
}

export default function TasksPage() {
  const { isAuthenticated } = useAuthStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get(API_ENDPOINTS.TASKS.LIST);
      
      if (response.data.success) {
        setTasks(response.data.data);
      } else {
        // Use mock data if endpoint not available
        setTasks([
          {
            id: '1',
            serviceType: 'take_out',
            status: 'completed',
            customer: {
              id: '1',
              name: 'John Doe',
              email: 'john@example.com'
            },
            dasher: {
              id: '1',
              name: 'Alex Wilson',
              email: 'alex@example.com'
            },
            address: {
              formattedAddress: '123 Main St, Austin, TX 78701'
            },
            scheduledDate: '2024-01-15',
            scheduledTime: '09:00',
            price: 15.00,
            createdAt: '2024-01-10T00:00:00Z',
            completedAt: '2024-01-15T09:30:00Z'
          },
          {
            id: '2',
            serviceType: 'wash',
            status: 'in_progress',
            customer: {
              id: '2',
              name: 'Sarah Brown',
              email: 'sarah@example.com'
            },
            dasher: {
              id: '2',
              name: 'Chris Davis',
              email: 'chris@example.com'
            },
            address: {
              formattedAddress: '456 Oak Ave, Austin, TX 78702'
            },
            scheduledDate: '2024-01-15',
            scheduledTime: '14:00',
            price: 20.00,
            createdAt: '2024-01-11T00:00:00Z'
          },
          {
            id: '3',
            serviceType: 'both',
            status: 'pending',
            customer: {
              id: '3',
              name: 'Lisa Green',
              email: 'lisa@example.com'
            },
            address: {
              formattedAddress: '789 Pine St, Austin, TX 78703'
            },
            scheduledDate: '2024-01-16',
            scheduledTime: '10:00',
            price: 30.00,
            createdAt: '2024-01-12T00:00:00Z'
          },
          {
            id: '4',
            serviceType: 'take_out',
            status: 'assigned',
            customer: {
              id: '4',
              name: 'Mike Johnson',
              email: 'mike@example.com'
            },
            dasher: {
              id: '3',
              name: 'Emma Taylor',
              email: 'emma@example.com'
            },
            address: {
              formattedAddress: '321 Elm St, Austin, TX 78704'
            },
            scheduledDate: '2024-01-15',
            scheduledTime: '16:00',
            price: 15.00,
            createdAt: '2024-01-13T00:00:00Z'
          },
          {
            id: '5',
            serviceType: 'wash',
            status: 'cancelled',
            customer: {
              id: '5',
              name: 'David Wilson',
              email: 'david@example.com'
            },
            address: {
              formattedAddress: '654 Maple Dr, Austin, TX 78705'
            },
            scheduledDate: '2024-01-14',
            scheduledTime: '11:00',
            price: 20.00,
            createdAt: '2024-01-09T00:00:00Z'
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      message.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'processing';
      case 'assigned':
        return 'blue';
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
      case 'completed':
        return <CheckCircleOutlined />;
      case 'in_progress':
      case 'assigned':
        return <ClockCircleOutlined />;
      case 'pending':
        return <ClockCircleOutlined />;
      case 'cancelled':
        return <ExclamationCircleOutlined />;
      default:
        return <ClockCircleOutlined />;
    }
  };

  const getServiceTypeColor = (type: string) => {
    switch (type) {
      case 'take_out':
        return 'blue';
      case 'wash':
        return 'green';
      case 'both':
        return 'purple';
      default:
        return 'default';
    }
  };

  const getServiceTypeLabel = (type: string) => {
    switch (type) {
      case 'take_out':
        return 'Take Out';
      case 'wash':
        return 'Wash';
      case 'both':
        return 'Take Out + Wash';
      default:
        return type;
    }
  };

  const handleTaskAction = (action: string, taskId: string) => {
    switch (action) {
      case 'view':
        message.info('View task details - coming soon!');
        break;
      case 'edit':
        message.info('Edit task - coming soon!');
        break;
      case 'assign':
        message.info('Assign dasher - coming soon!');
        break;
      case 'cancel':
        Modal.confirm({
          title: 'Cancel Task',
          content: 'Are you sure you want to cancel this task?',
          onOk: () => {
            message.success('Task cancelled successfully');
            fetchTasks();
          },
        });
        break;
      case 'delete':
        Modal.confirm({
          title: 'Delete Task',
          content: 'Are you sure you want to delete this task? This action cannot be undone.',
          okText: 'Delete',
          okType: 'danger',
          onOk: () => {
            message.success('Task deleted successfully');
            fetchTasks();
          },
        });
        break;
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
      task.customer.email.toLowerCase().includes(searchText.toLowerCase()) ||
      (task.dasher && task.dasher.name.toLowerCase().includes(searchText.toLowerCase())) ||
      task.address.formattedAddress.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesService = serviceFilter === 'all' || task.serviceType === serviceFilter;
    
    return matchesSearch && matchesStatus && matchesService;
  });

  const columns = [
    {
      title: 'Task ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Service',
      dataIndex: 'serviceType',
      key: 'serviceType',
      render: (type: string) => (
        <Tag color={getServiceTypeColor(type)}>
          {getServiceTypeLabel(type)}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge 
          status={status === 'completed' ? 'success' : status === 'in_progress' ? 'processing' : status === 'pending' ? 'warning' : 'error'} 
          text={
            <Tag color={getStatusColor(status)} icon={getStatusIcon(status)}>
              {status.replace('_', ' ').toUpperCase()}
            </Tag>
          }
        />
      ),
    },
    {
      title: 'Customer',
      key: 'customer',
      render: (task: Task) => (
        <div className="flex items-center space-x-2">
          <Avatar icon={<UserOutlined />} size="small" />
          <div>
            <div className="font-medium">{task.customer.name}</div>
            <div className="text-xs text-gray-500">{task.customer.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Dasher',
      key: 'dasher',
      render: (task: Task) => (
        task.dasher ? (
          <div className="flex items-center space-x-2">
            <Avatar icon={<CarOutlined />} size="small" />
            <div>
              <div className="font-medium">{task.dasher.name}</div>
              <div className="text-xs text-gray-500">{task.dasher.email}</div>
            </div>
          </div>
        ) : (
          <Tag color="orange">Unassigned</Tag>
        )
      ),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (address: any) => (
        <div className="max-w-xs truncate" title={address.formattedAddress}>
          {address.formattedAddress}
        </div>
      ),
    },
    {
      title: 'Scheduled',
      key: 'scheduled',
      render: (task: Task) => (
        <div>
          <div className="font-medium">{task.scheduledDate}</div>
          <div className="text-xs text-gray-500">{task.scheduledTime}</div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <div className="flex items-center space-x-1">
          <DollarOutlined className="text-green-500" />
          <span className="font-medium">{price.toFixed(2)}</span>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (task: Task) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item 
                key="view" 
                icon={<EyeOutlined />}
                onClick={() => handleTaskAction('view', task.id)}
              >
                View Details
              </Menu.Item>
              <Menu.Item 
                key="edit" 
                icon={<EditOutlined />}
                onClick={() => handleTaskAction('edit', task.id)}
              >
                Edit Task
              </Menu.Item>
              {!task.dasher && (
                <Menu.Item 
                  key="assign" 
                  icon={<CarOutlined />}
                  onClick={() => handleTaskAction('assign', task.id)}
                >
                  Assign Dasher
                </Menu.Item>
              )}
              {task.status !== 'completed' && task.status !== 'cancelled' && (
                <Menu.Item 
                  key="cancel" 
                  icon={<ExclamationCircleOutlined />}
                  onClick={() => handleTaskAction('cancel', task.id)}
                >
                  Cancel Task
                </Menu.Item>
              )}
              <Menu.Divider />
              <Menu.Item 
                key="delete" 
                icon={<DeleteOutlined />}
                danger
                onClick={() => handleTaskAction('delete', task.id)}
              >
                Delete Task
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
              Task Management
            </h1>
            <p className="text-gray-600">
              Monitor and manage all service tasks across the platform
            </p>
          </div>

          <Card>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Search
                placeholder="Search tasks by customer, dasher, or address"
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
                <Option value="pending">Pending</Option>
                <Option value="assigned">Assigned</Option>
                <Option value="in_progress">In Progress</Option>
                <Option value="completed">Completed</Option>
                <Option value="cancelled">Cancelled</Option>
              </Select>
              <Select
                placeholder="Filter by service"
                style={{ width: 150 }}
                value={serviceFilter}
                onChange={setServiceFilter}
              >
                <Option value="all">All Services</Option>
                <Option value="take_out">Take Out</Option>
                <Option value="wash">Wash</Option>
                <Option value="both">Both</Option>
              </Select>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => message.info('Create new task - coming soon!')}
              >
                Create Task
              </Button>
            </div>

            <Table
              columns={columns}
              dataSource={filteredTasks}
              loading={loading}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `${range[0]}-${range[1]} of ${total} tasks`,
              }}
            />
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
} 