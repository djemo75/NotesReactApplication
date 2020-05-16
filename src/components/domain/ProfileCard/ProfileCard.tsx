/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from 'react';
import { Card, Image } from 'react-bootstrap';
import { userModel } from 'types/userModel';
import { AuthContext } from 'components/context/authContext';
import { taskModel } from 'types/taskModel.';
import { getTasksByUserId } from 'components/api/tasks';
import styles from './ProfileCard.module.css';
import ProfileEditForm from '../ProfileEditForm';
import DeleteUserForm from '../DeleteUserForm';
import TasksTable from '../Tasks/TasksTable';

type Props = {
  user: userModel;
  onUpdate: (updatedData: userModel) => void;
};

function ProfileCard({ user: profileUser, onUpdate }: Props) {
  const [tasks, setTasks] = useState<taskModel[]>([]);
  const { user } = useContext(AuthContext);

  const loadTasks = async (id: number) => {
    if (user) {
      const res = await getTasksByUserId(id);
      setTasks(res);
    }
  };

  useEffect(() => {
    loadTasks(profileUser?.id);
  }, [profileUser?.id]);
  
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
          ) : null}{' '}
          {user?.isAdmin && <DeleteUserForm userId={profileUser.id} />}
        </Card.Title>
        <div className={styles.cardInformation}>
          <div style={{ width: '100%', marginRight: '0.5rem' }}>
            Age: {profileUser.age}
            <br />
            Username: {profileUser.username}
            <br />
            Rank: {profileUser.isAdmin ? 'admin' : 'user'}
            <h5>User tasks:</h5>
            {tasks && tasks.length ? (
              <TasksTable tasks={tasks} />
            ) : (
              ' haven\'t tasks yet'
            )}
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
