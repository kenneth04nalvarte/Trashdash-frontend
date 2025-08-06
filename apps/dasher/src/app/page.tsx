'use client';

import { useState } from 'react';
import { Card, Form, Input, Button, Alert, Typography, Space, Divider } from 'antd';
import { UserOutlined, LockOutlined, Truck, MapPin, Clock, DollarSign } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

export default function DasherLoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuthStore();
  const router = useRouter();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await login(values);
      if (result.success) {
        router.push('/dashboard/');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const testBackendConnection = async () => {
    try {
      const response = await fetch('https://trashdash-backend-7188044708.us-central1.run.app/api/health');
      if (response.ok) {
        alert('✅ Backend connection successful!');
      } else {
        alert('❌ Backend connection failed');
      }
    } catch (error) {
      alert('❌ Backend connection failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Truck className="h-12 w-12 text-green-600 mr-3" />
            <Title level={2} className="!mb-0 text-green-600">
              TrashDash
            </Title>
          </div>
          <Title level={3} className="!mb-2">
            Dasher Portal
          </Title>
          <Text type="secondary" className="text-lg">
            Sign in to access your tasks
          </Text>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg border-0 rounded-xl">
          <Form
            name="dasher-login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Enter your email"
                className="h-12 rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter your password"
                className="h-12 rounded-lg"
              />
            </Form.Item>

            {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                className="mb-4"
              />
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-12 bg-green-600 hover:bg-green-700 border-0 rounded-lg font-semibold"
              >
                Sign In to Dasher Portal
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* Features */}
        <Card className="mt-6 shadow-lg border-0 rounded-xl">
          <Title level={4} className="!mb-4 text-center">
            Dasher Features
          </Title>
          <Space direction="vertical" className="w-full">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-blue-500 mr-3" />
              <Text>Navigate to pickup locations</Text>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-green-500 mr-3" />
              <Text>Track task progress in real-time</Text>
            </div>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-yellow-500 mr-3" />
              <Text>Monitor your earnings</Text>
            </div>
          </Space>
        </Card>

        {/* Test Credentials */}
        <Card className="mt-6 shadow-lg border-0 rounded-xl">
          <Title level={4} className="!mb-4 text-center">
            Dasher Test Credentials
          </Title>
          <div className="space-y-2 text-sm">
            <div><strong>Email:</strong> dasher@trashdash.com</div>
            <div><strong>Password:</strong> password123</div>
          </div>
        </Card>

        {/* Debug Tools */}
        <Card className="mt-6 shadow-lg border-0 rounded-xl">
          <Title level={4} className="!mb-4 text-center">
            Debug Tools
          </Title>
          <Button
            onClick={testBackendConnection}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 rounded-lg"
          >
            Test Backend Connection
          </Button>
        </Card>

        {/* Warning */}
        <div className="mt-6 text-center">
          <Alert
            message="This is a restricted dasher area. Unauthorized access is prohibited."
            type="warning"
            showIcon
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
} 