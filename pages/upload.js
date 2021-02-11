import Head from 'next/head'
import Link from 'next/link'
import { Button, Input } from '../components'
import Layout from '../components/layout'

export default function Upload() {
  return (
    <Layout>
      <Head>
        <title>Thingdrop | Upload</title>
      </Head>
      <h1>Upload a model</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>

      <form>
        <label>Name</label>
        {/* <Input /> */}
        <Button>Submit</Button>
      </form>
    </Layout>
  );
}
