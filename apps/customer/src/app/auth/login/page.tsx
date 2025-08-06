'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Form, Input, Button, Card, message } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { useAuthStore } from '../../../stores/authStore';
import api, { API_ENDPOINTS } from '../../../services/api';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const [form] = Form.useForm();

  const handleSubmit = async (values: LoginFormData) => {
    try {
      console.log('Login form submitted with:', values);
      const result = await login(values);
      console.log('Login result:', result);
      
      if (result.success) {
        message.success('Successfully logged in!');
        console.log('Redirecting to dashboard...');
        router.push('/dashboard');
      } else {
        console.error('Login failed:', result.error);
        message.error(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('An unexpected error occurred');
    }
  };

  const testBackendConnection = async () => {
    try {
      console.log('Testing backend connection...');
      const response = await api.get(API_ENDPOINTS.HEALTH);
      console.log('Backend health check response:', response.data);
      message.success('Backend is accessible!');
    } catch (error: any) {
      console.error('Backend connection test failed:', error);
      message.error(`Backend connection failed: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">
              Sign in to your TrashDash account
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
                placeholder="Enter your email"
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
                placeholder="Enter your password"
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
                className="h-12 bg-green-600 hover:bg-green-700"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                href="/auth/register"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center">
              <strong>Test Credentials:</strong><br />
              Email: customer@example.com<br />
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
              Test Backend Connection
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
} 