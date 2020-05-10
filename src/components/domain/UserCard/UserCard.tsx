import React from 'react';
import { Card } from 'react-bootstrap';
import { userModel } from 'types/userModel';
import { Link } from 'react-router-dom';
import styles from './UserCard.module.css';

type Props = {
  user: userModel;
};

function UserCard({ user: { name, age, picture, id, isActive } }: Props) {
  return (
    <Card className={styles.card}>
      <Card.Img variant="top" className={styles.cardImage} src={`${picture}`} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          Age: {age}
          <br />
          {isActive ? (
            <span className={styles.online}>online</span>
          ) : (
            <span className={styles.offline}>offline</span>
          )}
        </Card.Text>
        <Link to={`/users/${id}`} className="btn btn-primary">
          Profile
        </Link>
      </Card.Body>
    </Card>
  );
}

export default UserCard;
