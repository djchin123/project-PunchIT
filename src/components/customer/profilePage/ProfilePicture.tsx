//ProfilePicture.tsx
import React from 'react';
import profilepic from '../../../assets/profilepic.png';

interface ProfilePictureProps {
  src?: string;
  alt?: string;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({
  src = profilepic,
  alt = 'Profile Picture'
}) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        objectFit: 'cover'
      }}
    />
  );
};

export default ProfilePicture;
