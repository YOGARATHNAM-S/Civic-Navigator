import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  serverTimestamp,
  updateDoc,
  doc,
  setDoc
} from 'firebase/firestore';
import { db, auth } from '../lib/firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

const GUEST_ID = 'guest_user';

const getUserId = () => auth.currentUser?.uid || GUEST_ID;

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: getUserId(),
      email: auth.currentUser?.email,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const dbService = {
  getUserId,
  async addComplaint(data: any) {
    const path = 'complaints';
    try {
      return await addDoc(collection(db, path), {
        ...data,
        userId: getUserId(),
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, path);
    }
  },

  async getMyComplaints() {
    const path = 'complaints';
    try {
      const q = query(
        collection(db, path),
        where('userId', '==', getUserId()),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, path);
    }
  },

  async addChatMessage(chatId: string, message: any) {
    const chatRef = doc(db, 'chats', chatId);
    const messagesPath = `chats/${chatId}/messages`;
    try {
      // Ensure the chat session document exists so security rules pass for subcollection
      await setDoc(chatRef, {
        userId: getUserId(),
        updatedAt: serverTimestamp(),
      }, { merge: true });

      return await addDoc(collection(db, messagesPath), {
        ...message,
        timestamp: serverTimestamp(),
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, messagesPath);
    }
  },

  async getChatHistory(chatId: string) {
    const path = `chats/${chatId}/messages`;
    try {
      const q = query(
        collection(db, path),
        orderBy('timestamp', 'asc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() 
      }));
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, path);
    }
  },

  async createChatSession(title: string) {
    const path = 'chats';
    try {
      return await addDoc(collection(db, path), {
        userId: getUserId(),
        title,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, path);
    }
  }
};
