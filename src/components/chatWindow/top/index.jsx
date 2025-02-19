import React, { memo } from 'react';
import { useCurrentRoom } from '../../../context/currentRoomContext';
import { ButtonToolbar, Icon } from 'rsuite';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useMediaQuery } from '../../../misc/Custom-hooks';
import RoomBtnModal from './RoomBtnModal';
import EditRoomBtnDrawer from './EditRoomBtnDrawer';
const Top = () => {
  const name = useCurrentRoom(v => v.name);
  const isAdmin = useCurrentRoom(v => v.isAdmin);
  console.log(isAdmin);
  const isMobile = useMediaQuery('(max-width : 992px)');
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear d-flex align-items-center">
          <Icon
            componentClass={Link}
            to="/"
            icon={'arrow-circle-left'}
            size="2x"
            className={
              isMobile
                ? 'd-inline-block p-0 mr-2 text-blue link-unstyled'
                : 'd-none'
            }
          />
          <span className="text-disappear">{name}</span>
        </h4>
        <ButtonToolbar className="ws-nowrap">
          {isAdmin && <EditRoomBtnDrawer />}
        </ButtonToolbar>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <span>todo</span>
        <RoomBtnModal />
      </div>
    </div>
  );
};

export default memo(Top);
