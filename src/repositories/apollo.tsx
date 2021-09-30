import { useContext, useEffect, useState, FC } from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import { AuthContext } from '../auth/AuthProvider'
var jwt = require('jsonwebtoken');

const getLocallySignedToken = (token: string) => {
  let decodeToken = jwt.decode(token)
    decodeToken['https://hasura.io/jwt/claims'] =  {
      "x-hasura-default-role": "user",
      "x-hasura-allowed-roles": ["user"],
      "x-hasura-user-id": decodeToken.user_id,
    }
  return jwt.sign(decodeToken, "123456789012345678901234567890123");
};

const createApolloClient = (authToken: string | undefined) => {
  let token = authToken
  if (process.env.NODE_ENV !== "production" && authToken) {
    token = getLocallySignedToken(authToken)
  }
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_SERVER_URL + '/graphql',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }),
    cache: new InMemoryCache(),
  });
};

export const WithApolloProvider: FC = ({ children }) => {
  const [token, setToken] = useState<string>()
  const [client, setClient] = useState(createApolloClient(token));

  const user = useContext(AuthContext).currentUser
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        user.getIdToken().then(token => {
          setClient(createApolloClient(token))
          console.log('token2', token)
        })
      }
    }
    fetchData()
    console.log('user', user)
  }, [user])

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
   );
}