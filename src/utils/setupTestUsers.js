import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ROLES } from '../constants/roles';

const testUsers = [
  {
    email: 'teacher@test.com',
    password: 'teacher123',
    role: ROLES.TEACHER_INCHARGE,
    name: 'Dr. Smith',
    department: null
  },
  {
    email: 'chairperson@test.com',
    password: 'chair123',
    role: ROLES.CHAIRPERSON,
    name: 'John Doe',
    department: null
  },
  {
    email: 'vicechair@test.com',
    password: 'vice123',
    role: ROLES.VICE_CHAIRPERSON,
    name: 'Jane Wilson',
    department: 'Technical'
  },
  {
    email: 'hod@test.com',
    password: 'hod123',
    role: ROLES.HOD,
    name: 'Mike Johnson',
    department: 'Cultural'
  },
  {
    email: 'member@test.com',
    password: 'member123',
    role: ROLES.COMMITTEE_MEMBER,
    name: 'Sarah Brown',
    department: 'Technical'
  }
];

export async function createTestUsers() {
  try {
    for (const user of testUsers) {
      // Create auth user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      // Create user profile in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        createdAt: new Date().toISOString()
      });

      console.log(`Created user: ${user.email} with role: ${user.role}`);
    }
    console.log('All test users created successfully');
  } catch (error) {
    console.error('Error creating test users:', error);
  }
} 