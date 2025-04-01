// src/components/customer/profilePage/UserDetails.tsx
import React from 'react';

interface UserDetailsProps {
  name: string;
  email: string;
  number: string;
  timeWithCompany: string;
}

const UserDetails: React.FC<UserDetailsProps> = ({ name, email, number, timeWithCompany }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>{name}</h2>
      <p>Email: {email}</p>
      <p>Contact Number: {number}</p>
      <p>Time with Company: {timeWithCompany}</p>
    </div>
  );
};

export default UserDetails;
