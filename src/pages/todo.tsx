import { useMutation, useQuery } from '@apollo/client';
import { CREATE_TODO } from '../repositories/queries';
import { useContext, useState } from 'react'
import { AuthContext } from '../auth/AuthProvider'
import { GET_TODOS} from '../repositories/queries';

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
        { data?.todos.map( ( item: any ) => (
          <div className="skel-single-post" key={ item.id }>{item.id} {item.title}</div>
        ))}
      </div>
      <form
        onSubmit={e => {
          e.preventDefault()
          addTodo({ variables: { user_id: user?.uid, title: input } })
          setInput('')
          refetch()
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  )
}
