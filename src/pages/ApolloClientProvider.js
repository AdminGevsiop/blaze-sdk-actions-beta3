import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import BlazeOrange from '../themes/blaze-orange';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { getUser } from '../libs/utils';
import '../assets/styles/blaze-app.css';

const ApolloClientPage = props => {
  const user = getUser();

  const client = uri =>
    new ApolloClient({
      uri: `${uri}/api/v1/graphql`,
      headers: {
        authorization: `Bearer ${(user && user.accessToken) || ''}`,
      },
    });

  if (!user) {
    return null;
  }
  return (
    <ThemeProvider
      theme={
        BlazeOrange
      }
    >
      <ApolloProvider client={client(props.uri)}>
        <div className="App">{props.children}</div>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default ApolloClientPage;
