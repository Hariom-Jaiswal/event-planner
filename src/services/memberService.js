import { db } from '../firebase';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs,
  query,
  where 
} from 'firebase/firestore';

export const memberService = {
  async addMember(departmentId, memberData) {
    try {
      const membersRef = collection(db, 'departments', departmentId, 'members');
      const docRef = await addDoc(membersRef, {
        ...memberData,
        status: 'active',
        joinedDate: new Date().toISOString(),
        tasks: 0,
        createdAt: new Date().toISOString()
      });
      return { id: docRef.id, ...memberData };
    } catch (error) {
      throw new Error('Failed to add member: ' + error.message);
    }
  },

  async updateMember(departmentId, memberId, updates) {
    try {
      const memberRef = doc(db, 'departments', departmentId, 'members', memberId);
      await updateDoc(memberRef, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
      return true;
    } catch (error) {
      throw new Error('Failed to update member: ' + error.message);
    }
  },

  async removeMember(departmentId, memberId) {
    try {
      const memberRef = doc(db, 'departments', departmentId, 'members', memberId);
      await deleteDoc(memberRef);
      return true;
    } catch (error) {
      throw new Error('Failed to remove member: ' + error.message);
    }
  },

  async getDepartmentMembers(departmentId) {
    try {
      const membersRef = collection(db, 'departments', departmentId, 'members');
      const snapshot = await getDocs(membersRef);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      throw new Error('Failed to fetch members: ' + error.message);
    }
  }
}; 