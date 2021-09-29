import { useContext, useEffect, useState, FC } from 'react'
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import { AuthContext } from '../auth/AuthProvider'


const createApolloClient = (authToken: string | undefined) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_SERVER_URL + '/graphql',
      headers: {
        Authorization: `Bearer ${authToken}`
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
        const token = await user.getIdToken()
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