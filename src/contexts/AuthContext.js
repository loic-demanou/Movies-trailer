import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  FacebookAuthProvider
} from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function loginWithFacebook() {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  async function addToWishlist(item) {
    if (!currentUser) return;
    const wishlistItem = { id: item.id, 
      type: item.media_type || item.type, 
      title: item.title || item.name, 
      poster: item.poster_path, 
      vote_average: item.vote_average, 
      date: item.first_air_date || item.release_date || item.date, 
      addedAt: new Date()
     };
    const userWishlistRef = doc(db, 'wishlists', currentUser.uid);
    try {
      // return console.log(wishlistItem);
      await updateDoc(userWishlistRef, {
        items: arrayUnion(wishlistItem)
      });
    } catch (error) {
      if (error.code === 'not-found' || error.message.includes('No document to update')) {
        await setDoc(userWishlistRef, { items: [wishlistItem] });
      } else {
        console.error("Error adding to wishlist: ", error);
      }
    }
  }

  async function removeFromWishlist(itemId) {
    if (!currentUser) return;
    const userWishlistRef = doc(db, 'wishlists', currentUser.uid);
    const docSnap = await getDoc(userWishlistRef);
    if (docSnap.exists()) {
      const currentItems = docSnap.data().items || [];
      const itemToRemove = currentItems.find(item => item.id === itemId);
      if (itemToRemove) {
        await updateDoc(userWishlistRef, {
          items: arrayRemove(itemToRemove)
        });
      }
    } else {
      console.error("Wishlist document does not exist for removal");
    }
  }

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribeAuth;
  }, []);

  useEffect(() => {
    if (currentUser) {
      setWishlistLoading(true);
      const userWishlistRef = doc(db, 'wishlists', currentUser.uid);
      const unsubscribeWishlist = onSnapshot(userWishlistRef, (docSnap) => {
        if (docSnap.exists()) {
          setWishlist(docSnap.data().items || []);
        } else {
          setWishlist([]);
        }
        setWishlistLoading(false);
      }, (error) => {
        console.error("Error fetching wishlist: ", error);
        setWishlist([]);
        setWishlistLoading(false);
      });
      return () => unsubscribeWishlist();
    } else {
      setWishlist([]);
      setWishlistLoading(false);
    }
  }, [currentUser]);

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    loginWithGoogle,
    loginWithFacebook,
    resetPassword,
    wishlist,
    wishlistLoading,
    addToWishlist,
    removeFromWishlist
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 