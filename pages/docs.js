import Head from 'next/head'
import DocumentationPage from '../components/DocumentationPage'

export default function Docs() {
  return (
    <>
      <Head>
        <title>Transformer Architecture Documentation</title>
        <meta name="description" content="Comprehensive guide to transformer architecture components and mathematical foundations" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <DocumentationPage />
    </>
  )
}