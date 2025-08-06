'use client';

import { useState, useEffect } from 'react';
import { Card, Button, List, Tag, Space, message } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons';
import api, { API_ENDPOINTS } from '../../services/api';
import { useAuthStore } from '../../stores/authStore';

interface StatusItem {
  name: string;
  status: 'loading' | 'success' | 'error';
  message: string;
  details?: any;
}

export default function StatusPage() {
  const { user, isAuthenticated, token } = useAuthStore();
  const [statusItems, setStatusItems] = useState<StatusItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    runStatusChecks();
  }, []);

  const runStatusChecks = async () => {
    setLoading(true);
    const checks: StatusItem[] = [];

    // Check 1: API Base URL
    checks.push({
      name: 'API Configuration',
      status: 'loading',
      message: 'Checking API configuration...',
    });

    // Check 2: Backend Health
    try {
      const healthResponse = await api.get(API_ENDPOINTS.HEALTH);
      checks.push({
        name: 'Backend Health',
        status: 'success',
        message: 'Backend is accessible',
        details: healthResponse.data,
      });
    } catch (error: any) {
      checks.push({
        name: 'Backend Health',
        status: 'error',
        message: `Backend connection failed: ${error.message}`,
        details: error.response?.data,
      });
    }

    // Check 3: Authentication Status
    checks.push({
      name: 'Authentication',
      status: isAuthenticated ? 'success' : 'error',
      message: isAuthenticated ? 'User is authenticated' : 'User is not authenticated',
      details: isAuthenticated ? { user, hasToken: !!token } : null,
    });

    // Check 4: Test Login (if not authenticated)
    if (!isAuthenticated) {
      try {
        const loginResponse = await api.post(API_ENDPOINTS.AUTH.LOGIN, {
          email: 'customer@example.com',
          password: 'password123',
        });
        checks.push({
          name: 'Login Test',
          status: 'success',
          message: 'Login endpoint is working',
          details: loginResponse.data,
        });
      } catch (error: any) {
        checks.push({
          name: 'Login Test',
          status: 'error',
          message: `Login test failed: ${error.response?.data?.error || error.message}`,
          details: error.response?.data,
        });
      }
    }

    setStatusItems(checks);
    setLoading(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircleOutlined className="text-green-500" />;
      case 'error':
        return <CloseCircleOutlined className="text-red-500" />;
      case 'loading':
        return <LoadingOutlined className="text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'success';
      case 'error':
        return 'error';
      case 'loading':
        return 'processing';
      default:
        return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            TrashDash Frontend Status
          </h1>
          <p className="text-gray-600">
            System status and backend connectivity check
          </p>
        </div>

        <Card className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">System Status</h2>
            <Button onClick={runStatusChecks} loading={loading}>
              Refresh Status
            </Button>
          </div>

          <List
            dataSource={statusItems}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={getStatusIcon(item.status)}
                  title={
                    <div className="flex items-center gap-2">
                      <span>{item.name}</span>
                      <Tag color={getStatusColor(item.status)}>
                        {item.status.toUpperCase()}
                      </Tag>
                    </div>
                  }
                  description={item.message}
                />
                {item.details && (
                  <div className="mt-2">
                    <details className="text-sm text-gray-600">
                      <summary className="cursor-pointer">View Details</summary>
                      <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                        {JSON.stringify(item.details, null, 2)}
                      </pre>
                    </details>
                  </div>
                )}
              </List.Item>
            )}
          />
        </Card>

        <Card>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <Space wrap>
            <Button 
              type="primary" 
              onClick={() => window.location.href = '/auth/login'}
              className="bg-green-600 hover:bg-green-700"
            >
              Go to Login
            </Button>
            <Button 
              onClick={() => window.location.href = '/dashboard'}
            >
              Go to Dashboard
            </Button>
            <Button 
              onClick={() => window.open('http://localhost:3001/health', '_blank')}
            >
              Backend Health Check
            </Button>
          </Space>
        </Card>
      </div>
    </div>
  );
} 