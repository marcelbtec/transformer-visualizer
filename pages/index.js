import Head from 'next/head'
import Link from 'next/link'
import TransformerVisualizer from '../components/TransformerVisualizer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Transformer Architecture Visualizer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      {/* Add navigation bar */}
      <nav className="bg-gray-900 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-cyan-400">Transformer Visualizer</h1>
          <div className="space-x-4">
            <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Visualizer
            </Link>
            <Link href="/docs" className="text-gray-300 hover:text-cyan-400 transition-colors">
              Documentation
            </Link>
          </div>
        </div>
      </nav>
      
      <TransformerVisualizer />
    </>
  )
}