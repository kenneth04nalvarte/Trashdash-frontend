import { initializeApp, FirebaseApp } from 'firebase/app';
import { 
  getFirestore, 
  Firestore, 
  doc, 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  Unsubscribe,
  DocumentData,
  QuerySnapshot 
} from 'firebase/firestore';
import { 
  getMessaging, 
  Messaging, 
  getToken, 
  onMessage 
} from 'firebase/messaging';
import { Task, Notification, User } from '../types';

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
let app: FirebaseApp;
let db: Firestore;
let messaging: Messaging | null = null;

try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  
  // Initialize messaging if supported
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    messaging = getMessaging(app);
  }
} catch (error) {
  console.error('Firebase initialization error:', error);
}

export const firebaseService = {
  /**
   * Subscribe to real-time task updates
   */
  subscribeToTask: (taskId: string, callback: (task: Task) => void): Unsubscribe => {
    return onSnapshot(doc(db, 'tasks', taskId), (doc) => {
      if (doc.exists()) {
        callback(doc.data() as Task);
      }
    });
  },

  /**
   * Subscribe to user's tasks
   */
  subscribeToUserTasks: (userId: string, callback: (tasks: Task[]) => void): Unsubscribe => {
    const q = query(
      collection(db, 'tasks'),
      where('customerId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const tasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Task[];
      callback(tasks);
    });
  },

  /**
   * Subscribe to dasher's assigned tasks
   */
  subscribeToDasherTasks: (dasherId: string, callback: (tasks: Task[]) => void): Unsubscribe => {
    const q = query(
      collection(db, 'tasks'),
      where('dasherId', '==', dasherId),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const tasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Task[];
      callback(tasks);
    });
  },

  /**
   * Subscribe to user notifications
   */
  subscribeToUserNotifications: (userId: string, callback: (notifications: Notification[]) => void): Unsubscribe => {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      orderBy('sentAt', 'desc')
    );

    return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const notifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Notification[];
      callback(notifications);
    });
  },

  /**
   * Subscribe to unread notifications count
   */
  subscribeToUnreadCount: (userId: string, callback: (count: number) => void): Unsubscribe => {
    const q = query(
      collection(db, 'notifications'),
      where('userId', '==', userId),
      where('read', '==', false)
    );

    return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      callback(snapshot.size);
    });
  },

  /**
   * Subscribe to dasher location updates
   */
  subscribeToDasherLocation: (dasherId: string, callback: (location: { latitude: number; longitude: number; timestamp: string }) => void): Unsubscribe => {
    return onSnapshot(doc(db, 'dasher_locations', dasherId), (doc) => {
      if (doc.exists()) {
        callback(doc.data() as { latitude: number; longitude: number; timestamp: string });
      }
    });
  },

  /**
   * Subscribe to available tasks for dashers
   */
  subscribeToAvailableTasks: (latitude: number, longitude: number, radius: number, callback: (tasks: Task[]) => void): Unsubscribe => {
    // This would typically use geospatial queries, but for simplicity we'll use a basic query
    const q = query(
      collection(db, 'tasks'),
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const tasks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Task[];
      
      // Filter by distance (simplified - in production you'd use geospatial queries)
      const nearbyTasks = tasks.filter(task => {
        const distance = calculateDistance(latitude, longitude, task.address.latitude, task.address.longitude);
        return distance <= radius;
      });
      
      callback(nearbyTasks);
    });
  },

  /**
   * Subscribe to system-wide statistics (admin only)
   */
  subscribeToSystemStats: (callback: (stats: any) => void): Unsubscribe => {
    return onSnapshot(doc(db, 'system_stats', 'current'), (doc) => {
      if (doc.exists()) {
        callback(doc.data());
      }
    });
  },

  /**
   * Get push notification token
   */
  getPushToken: async (): Promise<string | null> => {
    if (!messaging) {
      console.warn('Firebase messaging not available');
      return null;
    }

    try {
      const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY,
      });
      return token;
    } catch (error) {
      console.error('Error getting push token:', error);
      return null;
    }
  },

  /**
   * Subscribe to push notification messages
   */
  onMessage: (callback: (payload: any) => void): (() => void) => {
    if (!messaging) {
      console.warn('Firebase messaging not available');
      return () => {};
    }

    return onMessage(messaging, callback);
  },

  /**
   * Update user's online status
   */
  updateOnlineStatus: async (userId: string, isOnline: boolean): Promise<void> => {
    // This would typically update a user's online status in Firestore
    // Implementation depends on your specific requirements
    console.log(`User ${userId} online status: ${isOnline}`);
  },

  /**
   * Update dasher location
   */
  updateDasherLocation: async (dasherId: string, latitude: number, longitude: number): Promise<void> => {
    // This would typically update a dasher's location in Firestore
    // Implementation depends on your specific requirements
    console.log(`Dasher ${dasherId} location: ${latitude}, ${longitude}`);
  },
};

/**
 * Calculate distance between two points using Haversine formula
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

export default firebaseService; 