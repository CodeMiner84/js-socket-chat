import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

interface Props {
  onAddNewRoom: () => void;
}

export default function AddRoomButton({ onAddNewRoom }: Props) {
  return (
    <div>
      <Button
        fullWidth
        variant="contained"
        className="dark"
        color="default"
        startIcon={<AddIcon />}
        onClick={onAddNewRoom}
      >
        Add new room
      </Button>
    </div>
  );
}
