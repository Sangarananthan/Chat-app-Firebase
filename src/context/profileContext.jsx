import { createContext, useContext, useState } from 'react';
export const ProfileContext = createContext();
const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(false);

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};
export const useProfile = () => useContext(ProfileContext);
export default ProfileProvider;
