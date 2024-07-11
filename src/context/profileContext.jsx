import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { auth, database } from '../misc/firebase';
export const ProfileContext = createContext();
const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isloading, setisloading] = useState(true);
  useEffect(() => {
    let userRef;
    const authUnsub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        userRef = database.ref(`/profiles/${authObj.uid}`);
        userRef.on('value', snap => {
          const { name, createdAt } = snap.val();
          const userData = {
            name,
            createdAt,
            uid: authObj.uid,
            email: authObj.email,
          };
          setProfile(userData);
          setisloading(false);
        });
      } else {
        if (userRef) {
          userRef.off();
        }
        setProfile(null);
        setisloading(false);
      }
    });
    return () => {
      authUnsub();
      if (userRef) {
        userRef.off();
      }
    };
  }, []);
  return (
    <ProfileContext.Provider value={(isloading, profile)}>
      {children}
    </ProfileContext.Provider>
  );
};
export const useProfile = () => useContext(ProfileContext);
export default ProfileProvider;
