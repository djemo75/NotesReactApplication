import React, { useContext } from 'react';
import { Card, Image } from 'react-bootstrap';
import { userModel } from 'types/userModel';
import { AuthContext } from 'components/context/authContext';
import styles from './ProfileCard.module.css';
import ProfileEditForm from '../ProfileEditForm';
import DeleteUserForm from '../DeleteUserForm';

type Props = {
  user: userModel;
  onUpdate: (updatedData: userModel) => void;
};

function ProfileCard({
  user: profileUser,
  onUpdate,
}: Props) {
  const { user } = useContext(AuthContext);
  return (
    <Card>
      <Card.Header>
        {profileUser.name}{' '}
        {profileUser.isActive ? (
          <span className={styles.online}>online</span>
        ) : (
          <span className={styles.offline}>offline</span>
        )}
      </Card.Header>
      <Card.Body>
        <Card.Title>
          Profile information{' '}
          {user?.isAdmin || user?.id === profileUser.id ? (
            <ProfileEditForm data={profileUser} onUpdate={onUpdate} />
          ) : null}
          {' '}
          {user?.isAdmin && <DeleteUserForm userId={profileUser.id} />}
        </Card.Title>
        <div className={styles.cardInformation}>
          <div>
            Age: {profileUser.age}
            <br />
            Username: {profileUser.username}
            <br />
            Rank: {profileUser.isAdmin ? 'admin' : 'user'}
            <br />
          </div>
          <div>
            <Image
              src={`${profileUser.picture}`}
              className={styles.avatarImage}
              thumbnail
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProfileCard;