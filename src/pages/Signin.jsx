import firebase from 'firebase';
import { auth, database } from '../misc/firebase';
import { Button, Container, Col, Grid, Row, Panel, Icon, Alert } from 'rsuite';
const Signin = () => {
  const SigninWithProvider = async provider => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          profilePhoto: user.photoURL,
        });
      }
      Alert.success('Signed in', 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };
  const onFacebookSignin = () => {
    SigninWithProvider(new firebase.auth.FacebookAuthProvider());
  };
  const onGoogleSignin = () => {
    SigninWithProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2>Welcome to Chat</h2>
                <p>Connect With Friends and Families</p>
              </div>
              <div className="mt-3">
                <Button block color="blue" onClick={onFacebookSignin}>
                  <Icon icon="facebook">{`  Continue With Facebook`}</Icon>
                </Button>
                <Button block color="green" onClick={onGoogleSignin}>
                  <Icon icon="google">{`   Continue With google`}</Icon>
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default Signin;
