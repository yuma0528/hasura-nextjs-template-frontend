import { useQuery } from '@apollo/client';
import { GET_USERS } from '../repositories/queries';

export default function Home() {
  const { loading, error, data } = useQuery(GET_USERS);

  return (
    <div>
      <h1>ユーザー一覧</h1>
      { data?.users?.map( ( item: any ) => (
        <div className="skel-single-post" key={ item.id }>{item.id}</div>
      ))}
    </div>
  )
}