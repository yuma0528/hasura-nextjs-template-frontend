import React, { useEffect, useState, FC } from 'react'
import { useRouter } from 'next/router'

import { auth } from '../utils/firebase'
import firebase from 'firebase/compat'
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const Login: FC = () => {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [mailError, setMailError] = useState<boolean>(false)
  const [passwordError, setPasswordError] = useState<boolean>(false)

  useEffect(() => {
    auth.onAuthStateChanged((user: firebase.User | null) => {
      user && router.push('/')
    })
  }, [])

  const logIn = async (e: any) => {
    e.preventDefault()
    try {
      const res = await auth.signInWithEmailAndPassword(email, password)
      if (res && res.user && !res.user.emailVerified) {
        setMailError(true)
        setPasswordError(true)
        setError('送信されたメールを確認してください')
      } else {
        router.push('/')
      }
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        setMailError(true)
        setPasswordError(true)
        setError('メールアドレスまたはパスワードが違います')
      } else if (err.code === 'auth/wrong-password') {
        setPasswordError(true)
        setMailError(false)
        setError('パスワードが違います')
      } else if (err.code === 'auth/invalid-email') {
        setMailError(true)
        setPasswordError(false)
        setError('正しいメールアドレスを入力してください')
      }
    }
  }

  return (
    <div className="wrapper">
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>メールアドレス</FormLabel>
                <Input type="email" onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>パスワード</FormLabel>
                <Input type="password" onChange={(e) => setPassword(e.target.value)}/>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>新規会員登録はこちら</Link>
                </Stack>
                <Button
                  onClick={logIn}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  ログイン
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </div>
  )
}

export default Login
