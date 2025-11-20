import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <meta name="description" content="Interactive technical visualizer for transformer architecture components - tokenization, embeddings, attention, and more" />
        <meta name="keywords" content="transformer, attention mechanism, machine learning, neural networks, visualization, education" />
        <meta name="author" content="Your Name" />
        <meta property="og:title" content="Transformer Architecture Visualizer" />
        <meta property="og:description" content="Deep dive into the mathematical foundations of transformer models with interactive visualizations" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Transformer Architecture Visualizer" />
        <meta name="twitter:description" content="Interactive technical visualizer for transformer components" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}