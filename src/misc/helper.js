export function getNameInitials(name) {
  const splitName = name.toUpperCase().split(' ');

  if (splitName.length > 1) {
    return splitName[0][0] + splitName[1][0];
  }
  return splitName[0][0];
}

export function transFormToArrayWithID(snapValue) {
  return snapValue
    ? Object.keys(snapValue).map(roomId => {
        return { ...snapValue[roomId], id: roomId };
      })
    : [];
}

export function transFormToArray(snapValue) {
  return snapValue ? Object.keys(snapValue) : [];
}

export async function getUserUpdates(userId, keyToUpdate, value, db) {
  // Object to hold all updates to be made
  const updates = {};

  // Update profile information for the user
  updates[`/profiles/${userId}/${keyToUpdate}`] = value;

  // Get messages authored by the user
  const getMsgs = db
    .ref('/messages')
    .orderByChild('author/uid')
    .equalTo(userId)
    .once('value');

  // Get rooms where the user is the last message's author
  const getRooms = db
    .ref('/rooms')
    .orderByChild('lastMessage/author/uid')
    .equalTo(userId)
    .once('value');

  // Await both asynchronous queries
  const [mSnap, rSnap] = await Promise.all([getMsgs, getRooms]);

  // Iterate over message snapshots
  mSnap.forEach(msgSnap => {
    // Update author information in each message
    updates[`/messages/${msgSnap.key}/author/${keyToUpdate}`] = value;
  });

  // Iterate over room snapshots
  rSnap.forEach(roomSnap => {
    // Update author information in each room's last message
    updates[`/rooms/${roomSnap.key}/lastMessage/author/${keyToUpdate}`] = value;
  });

  // Return the constructed updates object
  return updates;
}
