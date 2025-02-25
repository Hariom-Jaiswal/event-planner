import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userDepartments, setUserDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  async function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  async function getUserData(user) {
    if (user) {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserRole(userData.role);
        setUserDepartments(userData.departments || [userData.department].filter(Boolean));
        return {
          ...user,
          ...userData
        };
      }
    }
    return null;
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      const userData = await getUserData(user);
      setCurrentUser(userData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    userDepartments,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 