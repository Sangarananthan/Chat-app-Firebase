import { Alert, Button, Drawer, Icon } from 'rsuite';
import { useMediaQuery, useModalState } from '../../misc/Custom-hooks';
import Dashboard from './Dashboard';
import { useCallback } from 'react';
import { auth } from '../../misc/firebase';

const DashBoardToggle = () => {
  const { isOpen, open, close } = useModalState();
  const mobile = useMediaQuery('(max-width:992px)');
  const onSignOut = useCallback(() => {
    auth.signOut();
    Alert.info('Signed out', 4000);
    close();
  }, [close]);
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" />
        Dashboard
      </Button>
      <Drawer full={mobile} show={isOpen} onHide={close} placement="left">
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashBoardToggle;
