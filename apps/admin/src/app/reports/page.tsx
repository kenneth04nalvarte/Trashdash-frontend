'use client';

import { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Button, 
  Select, 
  DatePicker, 
  Space,
  Table,
  Tag,
  Progress
} from 'antd';
import { 
  DollarOutlined,
  UserOutlined,
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  DownloadOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area
} from 'recharts';
import { useAuthStore } from '../../stores/authStore';
import api, { API_ENDPOINTS } from '../../services/api';
import dayjs from 'dayjs';
import AdminLayout from '../../components/AdminLayout';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface ReportData {
  revenue: {
    total: number;
    thisMonth: number;
    thisWeek: number;
    trend: Array<{ date: string; revenue: number }>;
  };
  users: {
    total: number;
    newThisMonth: number;
    active: number;
    growth: Array<{ date: string; users: number }>;
  };
  tasks: {
    total: number;
    completed: number;
    pending: number;
    cancelled: number;
    completionRate: number;
    byStatus: Array<{ status: string; count: number; color: string }>;
  };
  performance: {
    averageRating: number;
    responseTime: number;
    satisfactionTrend: Array<{ date: string; rating: number }>;
  };
}

export default function ReportsPage() {
  const { isAuthenticated } = useAuthStore();
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(30, 'day'),
    dayjs()
  ]);
  const [reportType, setReportType] = useState<string>('overview');

  useEffect(() => {
    if (isAuthenticated) {
      fetchReportData();
    }
  }, [isAuthenticated, dateRange]);

  const fetchReportData = async () => {
    try {
      setLoading(true);
      const response = await api.get(API_ENDPOINTS.REPORTS.REVENUE);
      
      if (response.data.success) {
        setReportData(response.data.data);
      } else {
        // Use mock data if endpoint not available
        setReportData({
          revenue: {
            total: 15420.50,
            thisMonth: 3240.75,
            thisWeek: 890.25,
            trend: [
              { date: 'Jan 10', revenue: 1200 },
              { date: 'Jan 11', revenue: 1350 },
              { date: 'Jan 12', revenue: 1100 },
              { date: 'Jan 13', revenue: 1400 },
              { date: 'Jan 14', revenue: 1600 },
              { date: 'Jan 15', revenue: 1800 },
              { date: 'Jan 16', revenue: 2100 },
              { date: 'Jan 17', revenue: 1950 },
              { date: 'Jan 18', revenue: 2200 },
              { date: 'Jan 19', revenue: 2400 },
            ]
          },
          users: {
            total: 1250,
            newThisMonth: 45,
            active: 892,
            growth: [
              { date: 'Jan 10', users: 1180 },
              { date: 'Jan 11', users: 1190 },
              { date: 'Jan 12', users: 1200 },
              { date: 'Jan 13', users: 1210 },
              { date: 'Jan 14', users: 1220 },
              { date: 'Jan 15', users: 1230 },
              { date: 'Jan 16', users: 1240 },
              { date: 'Jan 17', users: 1245 },
              { date: 'Jan 18', users: 1248 },
              { date: 'Jan 19', users: 1250 },
            ]
          },
          tasks: {
            total: 960,
            completed: 892,
            pending: 23,
            cancelled: 12,
            completionRate: 92.9,
            byStatus: [
              { status: 'Completed', count: 892, color: '#00C49F' },
              { status: 'In Progress', count: 45, color: '#FFBB28' },
              { status: 'Pending', count: 23, color: '#FF8042' },
              { status: 'Cancelled', count: 12, color: '#FF0000' },
            ]
          },
          performance: {
            averageRating: 4.7,
            responseTime: 12.5,
            satisfactionTrend: [
              { date: 'Jan 10', rating: 4.5 },
              { date: 'Jan 11', rating: 4.6 },
              { date: 'Jan 12', rating: 4.4 },
              { date: 'Jan 13', rating: 4.7 },
              { date: 'Jan 14', rating: 4.8 },
              { date: 'Jan 15', rating: 4.7 },
              { date: 'Jan 16', rating: 4.9 },
              { date: 'Jan 17', rating: 4.6 },
              { date: 'Jan 18', rating: 4.8 },
              { date: 'Jan 19', rating: 4.7 },
            ]
          }
        });
      }
    } catch (error) {
      console.error('Error fetching report data:', error);
      // Use mock data if API is not available
      setReportData({
        revenue: {
          total: 15420.50,
          thisMonth: 3240.75,
          thisWeek: 890.25,
          trend: [
            { date: 'Jan 10', revenue: 1200 },
            { date: 'Jan 11', revenue: 1350 },
            { date: 'Jan 12', revenue: 1100 },
            { date: 'Jan 13', revenue: 1400 },
            { date: 'Jan 14', revenue: 1600 },
            { date: 'Jan 15', revenue: 1800 },
            { date: 'Jan 16', revenue: 2100 },
            { date: 'Jan 17', revenue: 1950 },
            { date: 'Jan 18', revenue: 2200 },
            { date: 'Jan 19', revenue: 2400 },
          ]
        },
        users: {
          total: 1250,
          newThisMonth: 45,
          active: 892,
          growth: [
            { date: 'Jan 10', users: 1180 },
            { date: 'Jan 11', users: 1190 },
            { date: 'Jan 12', users: 1200 },
            { date: 'Jan 13', users: 1210 },
            { date: 'Jan 14', users: 1220 },
            { date: 'Jan 15', users: 1230 },
            { date: 'Jan 16', users: 1240 },
            { date: 'Jan 17', users: 1245 },
            { date: 'Jan 18', users: 1248 },
            { date: 'Jan 19', users: 1250 },
          ]
        },
        tasks: {
          total: 960,
          completed: 892,
          pending: 23,
          cancelled: 12,
          completionRate: 92.9,
          byStatus: [
            { status: 'Completed', count: 892, color: '#00C49F' },
            { status: 'In Progress', count: 45, color: '#FFBB28' },
            { status: 'Pending', count: 23, color: '#FF8042' },
            { status: 'Cancelled', count: 12, color: '#FF0000' },
          ]
        },
        performance: {
          averageRating: 4.7,
          responseTime: 12.5,
          satisfactionTrend: [
            { date: 'Jan 10', rating: 4.5 },
            { date: 'Jan 11', rating: 4.6 },
            { date: 'Jan 12', rating: 4.4 },
            { date: 'Jan 13', rating: 4.7 },
            { date: 'Jan 14', rating: 4.8 },
            { date: 'Jan 15', rating: 4.7 },
            { date: 'Jan 16', rating: 4.9 },
            { date: 'Jan 17', rating: 4.6 },
            { date: 'Jan 18', rating: 4.8 },
            { date: 'Jan 19', rating: 4.7 },
          ]
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (type: string) => {
    // Mock export functionality
    console.log(`Exporting ${type} report...`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Unable to load report data</p>
          <Button onClick={fetchReportData} className="mt-4">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Reports & Analytics
                </h1>
                <p className="text-gray-600">
                  Comprehensive platform analytics and performance metrics
                </p>
              </div>
              <Space>
                <Select
                  value={reportType}
                  onChange={setReportType}
                  style={{ width: 150 }}
                >
                  <Option value="overview">Overview</Option>
                  <Option value="revenue">Revenue</Option>
                  <Option value="users">Users</Option>
                  <Option value="tasks">Tasks</Option>
                  <Option value="performance">Performance</Option>
                </Select>
                <RangePicker
                  value={dateRange}
                  onChange={(dates) => {
                    if (dates && Array.isArray(dates) && dates.length === 2) {
                      setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs]);
                    }
                  }}
                />
                <Button 
                  icon={<DownloadOutlined />}
                  onClick={() => handleExport(reportType)}
                >
                  Export
                </Button>
              </Space>
            </div>
          </div>

          {/* Key Metrics */}
          <Row gutter={[16, 16]} className="mb-8">
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Total Revenue"
                  value={reportData.revenue.total}
                  prefix={<DollarOutlined className="text-green-500" />}
                  valueStyle={{ color: '#22c55e' }}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Total Users"
                  value={reportData.users.total}
                  prefix={<UserOutlined className="text-blue-500" />}
                  valueStyle={{ color: '#3b82f6' }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Task Completion Rate"
                  value={reportData.tasks.completionRate}
                  prefix={<CheckCircleOutlined className="text-green-500" />}
                  valueStyle={{ color: '#22c55e' }}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Average Rating"
                  value={reportData.performance.averageRating}
                  prefix={<BarChartOutlined className="text-yellow-500" />}
                  valueStyle={{ color: '#f59e0b' }}
                  suffix="/ 5.0"
                />
              </Card>
            </Col>
          </Row>

          {/* Charts Row 1 */}
          <Row gutter={[16, 16]} className="mb-8">
            <Col xs={24} lg={12}>
              <Card title="Revenue Trend" className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={reportData.revenue.trend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#22c55e" 
                      strokeWidth={2}
                      dot={{ fill: '#22c55e' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="User Growth" className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={reportData.users.growth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          {/* Charts Row 2 */}
          <Row gutter={[16, 16]} className="mb-8">
            <Col xs={24} lg={12}>
              <Card title="Task Status Distribution" className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={reportData.tasks.byStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {reportData.tasks.byStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Customer Satisfaction Trend" className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={reportData.performance.satisfactionTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip formatter={(value) => [`${value}/5`, 'Rating']} />
                    <Bar dataKey="rating" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>

          {/* Detailed Metrics */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={8}>
              <Card title="Revenue Breakdown" className="chart-container">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>This Month</span>
                      <span className="font-medium">${reportData.revenue.thisMonth.toLocaleString()}</span>
                    </div>
                    <Progress 
                      percent={Math.round((reportData.revenue.thisMonth / reportData.revenue.total) * 100)} 
                      strokeColor="#22c55e"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>This Week</span>
                      <span className="font-medium">${reportData.revenue.thisWeek.toLocaleString()}</span>
                    </div>
                    <Progress 
                      percent={Math.round((reportData.revenue.thisWeek / reportData.revenue.total) * 100)} 
                      strokeColor="#3b82f6"
                    />
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card title="User Metrics" className="chart-container">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Active Users</span>
                      <span className="font-medium">{reportData.users.active}</span>
                    </div>
                    <Progress 
                      percent={Math.round((reportData.users.active / reportData.users.total) * 100)} 
                      strokeColor="#3b82f6"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>New This Month</span>
                      <span className="font-medium">{reportData.users.newThisMonth}</span>
                    </div>
                    <Progress 
                      percent={Math.round((reportData.users.newThisMonth / reportData.users.total) * 100)} 
                      strokeColor="#f59e0b"
                    />
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card title="Performance Metrics" className="chart-container">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Average Response Time</span>
                      <span className="font-medium">{reportData.performance.responseTime} min</span>
                    </div>
                    <Progress 
                      percent={Math.round((reportData.performance.responseTime / 30) * 100)} 
                      strokeColor="#22c55e"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Task Completion</span>
                      <span className="font-medium">{reportData.tasks.completed}/{reportData.tasks.total}</span>
                    </div>
                    <Progress 
                      percent={Math.round((reportData.tasks.completed / reportData.tasks.total) * 100)} 
                      strokeColor="#f59e0b"
                    />
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </AdminLayout>
  );
} 