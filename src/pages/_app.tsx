import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from "@chakra-ui/react"
import { AuthProvider } from '../auth/AuthProvider'
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import { WithApolloProvider } from '../repositories/apollo';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <WithApolloProvider>
          <Component {...pageProps} />
        </WithApolloProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}
export default MyApp
