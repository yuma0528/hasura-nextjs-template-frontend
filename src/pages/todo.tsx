import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TODO } from '../repositories/queries';
import { useContext, useState } from 'react'
import { AuthContext } from '../auth/AuthProvider'
import { GET_TODOS} from '../repositories/queries';

import { Button } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Box, Flex } from "@chakra-ui/layout";
import { List, ListItem, ListIcon, OrderedList, UnorderedList } from "@chakra-ui/react"
export default function Home() {
  const [input, setInput] = useState<string>('')

  const [addTodo] = useMutation(CREATE_TODO)
  const { loading, error, data, refetch } = useQuery(GET_TODOS);

  const user = useContext(AuthContext).currentUser

  if (loading) return 'loading...'
  if (error) return `Submission error! ${error.message}`

  return (
    <div>
      <div>

      </div>
      <Box textAlign="center">
        <UnorderedList spacing={3}>
          { data?.todos.map( ( item: any ) => (
            <ListItem>
              {item.title}
            </ListItem>
          ))}
        </UnorderedList>
            <form
              onSubmit={e => {
                e.preventDefault()
                addTodo({ variables: { user_id: user?.uid, title: input } })
                setInput('')
                refetch()
              }}
            >
              <Input
                mr={5}
                bg="white"
                placeholder="task"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
                <Button
                  type="submit"
                  colorScheme="yellow"
                  variant="solid"
                  cursor="pointer"
                  leftIcon={<AddIcon />}

                >
                  Add Todo
                </Button>
            </form>

      </Box>
    </div>
  )
}
