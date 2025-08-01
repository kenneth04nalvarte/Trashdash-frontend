'use client';

import { useState } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Switch, 
  Select, 
  InputNumber,
  Divider,
  Space,
  message,
  Alert
} from 'antd';
import { 
  SettingOutlined,
  BellOutlined,
  DollarOutlined,
  SecurityScanOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import AdminLayout from '../../components/AdminLayout';

const { Option } = Select;
const { TextArea } = Input;

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSave = async (values: any) => {
    setLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('Settings saved successfully!');
    } catch (error) {
      message.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            System Settings
          </h1>
          <p className="text-gray-600">
            Configure platform settings and preferences
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            platformName: 'TrashDash',
            supportEmail: 'support@trashdash.com',
            maxFileSize: 5,
            enableNotifications: true,
            enableSMS: true,
            enableEmail: true,
            defaultCurrency: 'USD',
            serviceFee: 2.50,
            minOrderAmount: 10.00,
            maxOrderAmount: 100.00,
            maintenanceMode: false,
            debugMode: false,
            autoAssignTasks: true,
            requirePhotoProof: true,
            enableReviews: true,
            maxRetries: 3,
            sessionTimeout: 30,
            passwordMinLength: 8,
            requireTwoFactor: false,
            enableGeofencing: true,
            geofenceRadius: 5000,
            enableRealTimeTracking: true,
            backupFrequency: 'daily',
            logRetention: 90,
            enableAnalytics: true,
            enableErrorReporting: true
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* General Settings */}
            <Card 
              title={
                <span>
                  <GlobalOutlined className="mr-2" />
                  General Settings
                </span>
              }
              className="chart-container"
            >
              <Form.Item
                name="platformName"
                label="Platform Name"
                rules={[{ required: true, message: 'Please enter platform name' }]}
              >
                <Input placeholder="Enter platform name" />
              </Form.Item>

              <Form.Item
                name="supportEmail"
                label="Support Email"
                rules={[
                  { required: true, message: 'Please enter support email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input placeholder="support@example.com" />
              </Form.Item>

              <Form.Item
                name="maxFileSize"
                label="Maximum File Size (MB)"
                rules={[{ required: true, message: 'Please enter max file size' }]}
              >
                <InputNumber min={1} max={50} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="defaultCurrency"
                label="Default Currency"
                rules={[{ required: true, message: 'Please select default currency' }]}
              >
                <Select>
                  <Option value="USD">USD ($)</Option>
                  <Option value="EUR">EUR (€)</Option>
                  <Option value="GBP">GBP (£)</Option>
                  <Option value="CAD">CAD (C$)</Option>
                </Select>
              </Form.Item>
            </Card>

            {/* Notification Settings */}
            <Card 
              title={
                <span>
                  <BellOutlined className="mr-2" />
                  Notification Settings
                </span>
              }
              className="chart-container"
            >
              <Form.Item
                name="enableNotifications"
                label="Enable Push Notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="enableSMS"
                label="Enable SMS Notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="enableEmail"
                label="Enable Email Notifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="enableReviews"
                label="Enable Customer Reviews"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Card>

            {/* Payment Settings */}
            <Card 
              title={
                <span>
                  <DollarOutlined className="mr-2" />
                  Payment Settings
                </span>
              }
              className="chart-container"
            >
              <Form.Item
                name="serviceFee"
                label="Service Fee ($)"
                rules={[{ required: true, message: 'Please enter service fee' }]}
              >
                <InputNumber 
                  min={0} 
                  max={50} 
                  step={0.01} 
                  style={{ width: '100%' }} 
                />
              </Form.Item>

              <Form.Item
                name="minOrderAmount"
                label="Minimum Order Amount ($)"
                rules={[{ required: true, message: 'Please enter minimum order amount' }]}
              >
                <InputNumber 
                  min={0} 
                  max={100} 
                  step={0.01} 
                  style={{ width: '100%' }} 
                />
              </Form.Item>

              <Form.Item
                name="maxOrderAmount"
                label="Maximum Order Amount ($)"
                rules={[{ required: true, message: 'Please enter maximum order amount' }]}
              >
                <InputNumber 
                  min={0} 
                  max={1000} 
                  step={0.01} 
                  style={{ width: '100%' }} 
                />
              </Form.Item>
            </Card>

            {/* Security Settings */}
            <Card 
              title={
                <span>
                  <SecurityScanOutlined className="mr-2" />
                  Security Settings
                </span>
              }
              className="chart-container"
            >
              <Form.Item
                name="maintenanceMode"
                label="Maintenance Mode"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="debugMode"
                label="Debug Mode"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="passwordMinLength"
                label="Minimum Password Length"
                rules={[{ required: true, message: 'Please enter minimum password length' }]}
              >
                <InputNumber min={6} max={20} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="requireTwoFactor"
                label="Require Two-Factor Authentication"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="sessionTimeout"
                label="Session Timeout (minutes)"
                rules={[{ required: true, message: 'Please enter session timeout' }]}
              >
                <InputNumber min={5} max={1440} style={{ width: '100%' }} />
              </Form.Item>
            </Card>

            {/* Task Settings */}
            <Card 
              title={
                <span>
                  <SettingOutlined className="mr-2" />
                  Task Settings
                </span>
              }
              className="chart-container"
            >
              <Form.Item
                name="autoAssignTasks"
                label="Auto-Assign Tasks"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="requirePhotoProof"
                label="Require Photo Proof"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="maxRetries"
                label="Maximum Retry Attempts"
                rules={[{ required: true, message: 'Please enter max retries' }]}
              >
                <InputNumber min={1} max={10} style={{ width: '100%' }} />
              </Form.Item>
            </Card>

            {/* Location Settings */}
            <Card 
              title={
                <span>
                  <GlobalOutlined className="mr-2" />
                  Location Settings
                </span>
              }
              className="chart-container"
            >
              <Form.Item
                name="enableGeofencing"
                label="Enable Geofencing"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                name="geofenceRadius"
                label="Geofence Radius (meters)"
                rules={[{ required: true, message: 'Please enter geofence radius' }]}
              >
                <InputNumber min={100} max={10000} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="enableRealTimeTracking"
                label="Enable Real-Time Tracking"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Card>
          </div>

          <Divider />

          <div className="flex justify-end space-x-4">
            <Button 
              size="large"
              onClick={() => form.resetFields()}
            >
              Reset to Defaults
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large"
              loading={loading}
            >
              Save Settings
            </Button>
          </div>
        </Form>

        <Alert
          message="Settings Information"
          description="Changes to these settings will affect the entire platform. Some settings may require a system restart to take effect."
          type="info"
          showIcon
          className="mt-6"
        />
      </div>
    </AdminLayout>
  );
} 