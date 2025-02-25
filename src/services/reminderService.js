import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  Timestamp 
} from 'firebase/firestore';

export const reminderService = {
  async createReminder(deadlineId, userId, date) {
    try {
      const remindersRef = collection(db, 'reminders');
      await addDoc(remindersRef, {
        deadlineId,
        userId,
        date: Timestamp.fromDate(new Date(date)),
        sent: false,
        createdAt: Timestamp.now()
      });
    } catch (error) {
      throw new Error('Failed to create reminder: ' + error.message);
    }
  },

  async getUpcomingReminders(userId) {
    try {
      const remindersRef = collection(db, 'reminders');
      const q = query(
        remindersRef,
        where('userId', '==', userId),
        where('sent', '==', false),
        where('date', '>=', Timestamp.now())
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw new Error('Failed to fetch reminders: ' + error.message);
    }
  }
}; 