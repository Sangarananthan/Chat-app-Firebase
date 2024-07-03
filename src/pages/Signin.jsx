import React from 'react';
import firebase from 'firebase';
import { auth } from '../misc/firebase';
import {
  Button,
  ButtonToolbar,
  Container,
  Col,
  Grid,
  Row,
  Panel,
  Icon,
} from 'rsuite';
const Signin = () => {
  const SigninWithProvider = async provider => {
    const result = await auth.signInWithPopup(provider);
    console.log(result);
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
                  <Icon icon="facebook">Continue With Facebook</Icon>
                </Button>
                <Button block color="green" onClick={onGoogleSignin}>
                  <Icon icon="google">Continue With google</Icon>
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
