import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  orderBy, 
  serverTimestamp,
  updateDoc,
  doc
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

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const dbService = {
  async addComplaint(data: any) {
    const path = 'complaints';
    try {
      return await addDoc(collection(db, path), {
        ...data,
        userId: auth.currentUser?.uid,
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
        where('userId', '==', auth.currentUser?.uid),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      handleFirestoreError(e, OperationType.LIST, path);
    }
  },

  async addChatMessage(chatId: string, message: any) {
    const path = `chats/${chatId}/messages`;
    try {
      return await addDoc(collection(db, path), {
        ...message,
        timestamp: serverTimestamp(),
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, path);
    }
  },

  async createChatSession(title: string) {
    const path = 'chats';
    try {
      return await addDoc(collection(db, path), {
        userId: auth.currentUser?.uid,
        title,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, path);
    }
  }
};
