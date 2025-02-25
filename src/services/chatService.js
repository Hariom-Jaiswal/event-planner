import { db } from '../firebase';
import { 
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
  doc,
  updateDoc
} from 'firebase/firestore';
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const chatService = {
  // Send message
  async sendMessage(chatId, message, type = 'text', metadata = {}) {
    try {
      const messagesRef = collection(db, 'chats', chatId, 'messages');
      await addDoc(messagesRef, {
        ...message,
        type,
        metadata,
        timestamp: Timestamp.now()
      });
    } catch (error) {
      throw new Error('Failed to send message: ' + error.message);
    }
  },

  // Upload file
  async uploadFile(chatId, file) {
    try {
      const fileRef = ref(storage, `chats/${chatId}/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      return url;
    } catch (error) {
      throw new Error('Failed to upload file: ' + error.message);
    }
  },

  // Create task from message
  async createTaskFromMessage(chatId, messageId, taskData) {
    try {
      const taskRef = collection(db, 'tasks');
      const docRef = await addDoc(taskRef, {
        ...taskData,
        chatId,
        messageId,
        status: 'pending',
        createdAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      throw new Error('Failed to create task: ' + error.message);
    }
  },

  // Subscribe to chat messages
  subscribeToChat(chatId, callback) {
    const messagesRef = collection(db, 'chats', chatId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));
    
    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(messages);
    });
  },

  // Get chat participants
  async getChatParticipants(chatId) {
    try {
      const chatRef = doc(db, 'chats', chatId);
      const participantsRef = collection(chatRef, 'participants');
      const snapshot = await getDocs(participantsRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw new Error('Failed to get participants: ' + error.message);
    }
  }
}; 