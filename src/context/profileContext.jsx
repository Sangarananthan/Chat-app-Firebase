import { createContext, useContext, useEffect, useState } from 'react';
import { auth, database } from '../misc/firebase';
import firebase from 'firebase/app';
export const isOfflineForDatabase = {
  state: 'offline',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: 'online',
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let userRef;
    let useStatusRef;
    const authUnsub = auth.onAuthStateChanged(authObj => {
      if (authObj) {
        console.log(`authObj.uid`, authObj.uid);
        useStatusRef = database.ref(`/status/${authObj.uid}`);
        userRef = database.ref(`/profiles/${authObj.uid}`);
        userRef.on('value', snap => {
          const { name, createdAt, avatar } = snap.val();
          const userData = {
            name,
            createdAt,
            uid: authObj.uid,
            email: authObj.email,
            avatar: avatar,
          };
          setProfile(userData);
          setIsLoading(false);
        });

        database.ref('.info/connected').on('value', snapshot => {
          if (!!snapshot.val() === false) {
            return;
          }
          useStatusRef
            .onDisconnect()
            .set(isOfflineForDatabase)
            .then(() => {
              useStatusRef.set(isOnlineForDatabase);
            });
        });
      } else {
        if (userRef) {
          userRef.off();
        }

        if (useStatusRef) {
          useStatusRef.off();
        }
        database.ref('.info/connected').off();
        setProfile(null);
        setIsLoading(false);
      }
    });

    return () => {
      authUnsub();
      database.ref('.info/connected').off();
      if (userRef) {
        userRef.off();
      }
      if (useStatusRef) {
        useStatusRef.off();
      }
    };
  }, []);

  return (
    <ProfileContext.Provider value={{ isLoading, profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
export default ProfileProvider;
