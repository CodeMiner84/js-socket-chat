import React from 'react';
import LogoutButton from './LogoutButton';
import List from './List';

interface Props {
  handleLogout: () => void;
}

export default function UsersList({ handleLogout }: Props) {
  return (
    <div id="users-list">
      <LogoutButton handleLogout={handleLogout} />
      <List />
    </div>
  );
}
