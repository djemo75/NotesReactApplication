import React, { useState, useEffect, useCallback, useContext } from 'react';
import { getUserById } from 'components/api/users';
import Layout from 'components/layout/Layout';
import { userModel } from 'types/userModel';
import { Row, Spinner } from 'react-bootstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ProfileCard from 'components/domain/ProfileCard';
import { AuthContext } from 'components/context/authContext';

type Props = RouteComponentProps<{ id: string }>;

function UserProfile({ match }: Props) {
  const [user, setUser] = useState<userModel | null>(null);
  const [loading, setLoading] = useState(false);

  const loadUser = useCallback(async () => {
    setLoading(true);
    const res = await getUserById(match.params.id);
    setUser(res);
    setLoading(false);
  }, [match.params.id]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const context = useContext(AuthContext);

  const applyEditInformation= (updatedData: userModel) => {
    setUser(updatedData);
  };
  
  if (context.user?.isAdmin !== true && context.user?.id !== user?.id) {
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
        {user && <ProfileCard user={user} onUpdate={applyEditInformation} />}
      </Layout>
    </>
  );
}

export default withRouter(UserProfile);
