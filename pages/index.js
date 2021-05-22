import Link from 'next/link'
import Layout from '../components/Layout'
import {API_URL} from '../config/index'

export default function Home({res}) {
  return (
    <Layout>
      <h1>{JSON.stringify(res)}</h1>
    </Layout>
  )
}

export async function getStaticProps() {
    const data = await fetch(`${API_URL}/api/events`)
    const res = await data.json()

    console.log(res)
    return {
        props: {res},
        revalidate: 1
    }
}
