import { Avatar } from 'rsuite';
import { getNameInitials } from '../../misc/helper';

const ProfileAvatar = ({ name, ...avatarProps }) => {
  return (
    <>
      <Avatar {...avatarProps} circle>
        {getNameInitials(name)}
      </Avatar>
    </>
  );
};

export default ProfileAvatar;
