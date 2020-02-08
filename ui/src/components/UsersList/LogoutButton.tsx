import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

interface Props {
  handleLogout: () => void;
}

export default function LogoutButton({ handleLogout }: Props) {
  return (
    <div>
      <Button
        fullWidth
        variant="contained"
        className="dark"
        color="default"
        startIcon={<AddIcon />}
        onClick={(e: any) => {
          e.preventDefault();
          handleLogout();
        }}
      >
        Logout
      </Button>
    </div>
  );
}
