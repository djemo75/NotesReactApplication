import React, { useState, useEffect, useContext } from 'react';
import { getUsers } from 'components/api/users';
import Layout from 'components/layout/Layout';
import { userModel } from 'types/userModel';
import UserCard from 'components/domain/UserCard';
import { Row, Col, Spinner } from 'react-bootstrap';
import { AuthContext } from 'components/context/authContext';

function Users() {
  const [users, setUsers] = useState<userModel[]>([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    const res = await getUsers();
    setUsers(res);
    setLoading(false);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const { user } = useContext(AuthContext);
  if (!user?.isAdmin) {
    return (
      <Layout>
        <Row className="justify-content-center">
          You must be Admin to see this page!
        </Row>
      </Layout>
    );
  }
  return (
    <>
      <Layout>
        {loading && (
          <Row className="justify-content-center">
            <Spinner animation="border" />
          </Row>
        )}
        {users && users.length > 0 && (
          <>
            <h2 style={{ margin: '1.5rem 0' }}>Statistic:</h2>
            <h6>
              Admins: {users.filter((x) => x.isAdmin === true).length} {'  '}
              Users: {users.filter((x) => x.isAdmin === false).length} {'  '}
              Active now: {users.filter((x) => x.isActive === true).length}
            </h6>
            <Row>
              {users.map((data) => (
                <Col lg={3} key={data.id}>
                  <UserCard user={data} />
                </Col>
              ))}
            </Row>
          </>
        )}
      </Layout>
    </>
  );
}

export default Users;
