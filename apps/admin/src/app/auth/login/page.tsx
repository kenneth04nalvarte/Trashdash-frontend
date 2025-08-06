'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Card, message } from 'antd';
import { MailOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import { useAuthStore } from '../../../stores/authStore';
import api, { API_ENDPOINTS } from '../../../services/api';

interface LoginFormData {
  email: string;
  password: string;
}

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const [form] = Form.useForm();

  const handleSubmit = async (values: LoginFormData) => {
    try {
      console.log('Admin login form submitted with:', values);
      const result = await login(values);
      console.log('Admin login result:', result);
      
      if (result.success) {
        message.success('Welcome to TrashDash Admin Panel!');
        console.log('Redirecting to admin dashboard...');
        router.push('/dashboard');
      } else {
        console.error('Admin login failed:', result.error);
        message.error(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      message.error('An unexpected error occurred');
    }
  };

  const testBackendConnection = async () => {
    try {
      console.log('Testing admin backend connection...');
      const response = await api.get(API_ENDPOINTS.HEALTH);
      console.log('Admin backend health check response:', response.data);
      message.success('Admin backend is accessible!');
    } catch (error: any) {
      console.error('Admin backend connection test failed:', error);
      message.error(`Admin backend connection failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
              <SafetyOutlined className="text-white text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Admin Access
            </h1>
            <p className="text-gray-600">
              Sign in to TrashDash Admin Panel
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder="Enter admin email"
                size="large"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please enter your password' },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter admin password"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={isLoading}
                className="h-12"
              >
                Sign In to Admin Panel
              </Button>
            </Form.Item>
          </Form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              <strong>Admin Test Credentials:</strong><br />
              Email: admin@trashdash.com<br />
              Password: password123
            </p>
          </div>

          {/* Debug section - remove in production */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-600 text-center mb-2">
              <strong>Debug Tools:</strong>
            </p>
            <Button 
              size="small" 
              onClick={testBackendConnection}
              className="w-full"
            >
              Test Admin Backend Connection
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              ⚠️ This is a restricted admin area. Unauthorized access is prohibited.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
} 