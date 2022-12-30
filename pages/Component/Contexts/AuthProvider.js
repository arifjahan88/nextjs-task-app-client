"use client";
import React, { createContext, useEffect, useState } from "react";

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../../../firebase/firebase";

export const AuthContext = createContext();

const auth = getAuth(app);
const googleprovider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setloading] = useState(true);

  const creteuser = (email, password) => {
    setloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    setloading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googlelogin = () => {
    setloading(true);
    return signInWithPopup(auth, googleprovider);
  };
  const logout = () => {
    localStorage.removeItem("genius-car-token");
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setuser(currentuser);
      setloading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, []);

  const AuthInfo = { user, loading, creteuser, login, googlelogin, logout };
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
