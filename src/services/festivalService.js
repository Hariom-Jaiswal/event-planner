import { db } from '../firebase';
import { 
  doc, 
  getDoc, 
  setDoc, 
  Timestamp 
} from 'firebase/firestore';

export const festivalService = {
  async setFestivalDates(startDate, endDate) {
    try {
      await setDoc(doc(db, 'settings', 'festival'), {
        startDate: Timestamp.fromDate(new Date(startDate)),
        endDate: Timestamp.fromDate(new Date(endDate)),
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      throw new Error('Failed to set festival dates: ' + error.message);
    }
  },

  async getFestivalDates() {
    try {
      const docRef = await getDoc(doc(db, 'settings', 'festival'));
      if (docRef.exists()) {
        const data = docRef.data();
        return {
          startDate: data.startDate.toDate(),
          endDate: data.endDate.toDate()
        };
      }
      return null;
    } catch (error) {
      throw new Error('Failed to get festival dates: ' + error.message);
    }
  }
}; 