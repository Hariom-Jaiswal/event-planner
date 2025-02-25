import { db } from '../firebase';
import { 
  collection, 
  doc,
  addDoc, 
  updateDoc, 
  getDocs,
  query,
  where,
  Timestamp 
} from 'firebase/firestore';

export const sponsorService = {
  async addSponsor(sponsorData) {
    try {
      const sponsorsRef = collection(db, 'sponsors');
      const docRef = await addDoc(sponsorsRef, {
        ...sponsorData,
        status: 'talking',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return { id: docRef.id, ...sponsorData };
    } catch (error) {
      throw new Error('Failed to add sponsor: ' + error.message);
    }
  },

  async updateSponsorStatus(sponsorId, status, notes) {
    try {
      const sponsorRef = doc(db, 'sponsors', sponsorId);
      await updateDoc(sponsorRef, {
        status,
        notes,
        updatedAt: Timestamp.now()
      });
      return true;
    } catch (error) {
      throw new Error('Failed to update sponsor status: ' + error.message);
    }
  },

  async updateSponsorDuties(sponsorId, duties) {
    try {
      const sponsorRef = doc(db, 'sponsors', sponsorId);
      await updateDoc(sponsorRef, {
        duties,
        updatedAt: Timestamp.now()
      });
      return true;
    } catch (error) {
      throw new Error('Failed to update sponsor duties: ' + error.message);
    }
  },

  async getSponsors(status = 'all') {
    try {
      const sponsorsRef = collection(db, 'sponsors');
      const q = status === 'all' 
        ? sponsorsRef
        : query(sponsorsRef, where('status', '==', status));
      
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw new Error('Failed to fetch sponsors: ' + error.message);
    }
  }
}; 