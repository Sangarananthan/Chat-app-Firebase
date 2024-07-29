import PropTypes from 'prop-types';
import { usePresence } from '../misc/Custom-hooks';
import { Whisper, Tooltip, Badge } from 'rsuite';

const PresenceDot = ({ uid }) => {
  const { presence } = usePresence(uid);

  const getColor = presence => {
    if (!presence) {
      return 'gray';
    }
    switch (presence.state) {
      case 'online':
        return 'green';
      case 'offline':
        return 'red';
      default:
        return 'gray';
    }
  };

  const getText = presence => {
    if (!presence) {
      return 'Unknown State';
    }

    if (presence.state === 'online') {
      return 'Online';
    } else if (presence.last_changed) {
      return `Last Online ${new Date(presence.last_changed).toLocaleString()}`;
    }
    return 'Unknown State';
  };

  const tooltip = <Tooltip>{getText(presence)}</Tooltip>;

  return (
    <Whisper
      placement="top"
      controlId="control-id-hover"
      trigger="hover"
      speaker={tooltip}
    >
      <Badge
        className="cursor-pointer"
        aria-label={getText(presence)}
        style={{
          backgroundColor: getColor(presence),
          width: 10,
          height: 10,
          borderRadius: '50%',
          display: 'inline-block',
        }}
      />
    </Whisper>
  );
};

PresenceDot.propTypes = {
  uid: PropTypes.string.isRequired,
};

export default PresenceDot;
