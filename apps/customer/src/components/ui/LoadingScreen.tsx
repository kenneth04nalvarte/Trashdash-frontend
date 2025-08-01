import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingScreenProps {
  message?: string;
  size?: 'small' | 'default' | 'large';
}

export function LoadingScreen({ 
  message = 'Loading...', 
  size = 'large' 
}: LoadingScreenProps) {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mb-4">
          <Spin indicator={antIcon} size={size} />
        </div>
        <p className="text-gray-600 text-lg font-medium">{message}</p>
      </div>
    </div>
  );
} 