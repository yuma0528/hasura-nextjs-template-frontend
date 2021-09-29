import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../repositories/queries';

export default function Home() {
  const { loading, error, data } = useQuery(GET_USERS);

  return (
    <div>
      { data?.users?.map( ( item: any ) => (
        <div className="skel-single-post" key={ item.id }>{item.id}</div>
      ))}
    </div>
  )
}
