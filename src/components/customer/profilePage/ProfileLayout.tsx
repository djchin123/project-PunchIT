//ProfileLayout.tsx
import React from 'react';
import ProfilePicture from './ProfilePicture';
import UserDetails from './UserDetails';
import LogoutButton from './LogoutButton';
import profilepic from '../../../assets/profilepic.png';

interface User {
  name: string;
  email: string;
  timeWithCompany: string;
  avatarUrl: string;
  number: string
}

const ProfilePage: React.FC = () => {
  const user: User = {
    name: 'Vedant Ajwani',
    email: 'vedant@gmail.com',
    number: '(901) 243-9132',
    timeWithCompany: '3 years',
    avatarUrl: profilepic,
  };

  // Handle logout logic (e.g., clearing tokens, redirecting, etc.)
  const handleLogout = () => {
    console.log('User logged out');
    // Add your logout logic here
  };

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
      }}
    >
      {/* Profile Picture */}
      <ProfilePicture src={user.avatarUrl} alt={user.name} />

      {/* User Details */}
      <UserDetails
        name={user.name}
        email={user.email}
        timeWithCompany={user.timeWithCompany}
        number={user.number}
      />

      {/* Logout Button */}
      <div style={{ marginTop: '20px' }}>
        <LogoutButton onLogout={handleLogout} />
      </div>
    </div>
  );
};

export default ProfilePage;
