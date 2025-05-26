import React, { useState, useMemo } from 'react';
import { Grid, Brain, Target, Zap, ArrowRight, Hash, Eye } from 'lucide-react';

const TechnicalTransformerVisualizer = () => {
  const [currentStep, setCurrentStep] = useState(0);

  // Real example data
  const inputText = "The cat sat on the mat";
  const tokens = ["[CLS]", "The", "cat", "sat", "on", "the", "mat", "[SEP]"];
  const tokenIds = [101, 1996, 4937, 2938, 2006, 1996, 13523, 102];
  
  // Generate realistic embeddings (simplified to 8D for visualization)
  const embeddings = useMemo(() => 
    tokens.map((_, i) => 
      Array.from({length: 8}, (_, j) => 
        Math.sin((i + 1) * (j + 1) * 0.5) * (Math.random() * 0.4 + 0.8)
      )
    ), []
  );

  // Positional encodings using actual transformer formula
  const positionalEncodings = useMemo(() => 
    tokens.map((_, pos) => 
      Array.from({length: 8}, (_, i) => {
        const angle = pos / Math.pow(10000, (2 * Math.floor(i/2)) / 8);
        return i % 2 === 0 ? Math.sin(angle) : Math.cos(angle);
      })
    ), []
  );

  // Attention weights matrix
  const attentionWeights = useMemo(() => 
    tokens.map((_, i) => 
      tokens.map((_, j) => {
        // Simulate realistic attention patterns
        let weight = Math.exp(-Math.abs(i - j) * 0.3); // Distance decay
        if (tokens[j] === "[CLS]" || tokens[j] === "[SEP]") weight *= 1.5;
        if (tokens[i] === "cat" && tokens[j] === "sat") weight *= 2;
        if (tokens[i] === "sat" && tokens[j] === "mat") weight *= 1.8;
        return weight + Math.random() * 0.1;
      })
    ).map(row => {
      const sum = row.reduce((a, b) => a + b, 0);
      return row.map(w => w / sum); // Normalize to sum to 1
    }), []
  );

  const steps = [
    { 
      name: "Input Text", 
      icon: Hash,
      description: "Raw input text ready for processing"
    },
    { 
      name: "Tokenization", 
      icon: Grid,
      description: "Text → Token IDs using WordPiece/BPE"
    },
    { 
      name: "Token Embeddings", 
      icon: Brain,
      description: "Token IDs → Dense vectors (d_model=512)"
    },
    { 
      name: "Positional Encoding", 
      icon: Target,
      description: "Adding sinusoidal position information"
    },
    { 
      name: "Attention Mechanism", 
      icon: Zap,
      description: "Self-attention weight computation"
    },
    { 
      name: "Feed Forward", 
      icon: ArrowRight,
      description: "Position-wise FFN transformation"
    }
  ];

  const InputTextView = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="text-4xl font-mono text-cyan-400 bg-gray-900 p-8 rounded-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/20">
          "{inputText}"
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Input Characteristics</h3>
          <div className="space-y-2 font-mono text-sm">
            <div>Length: {inputText.length} characters</div>
            <div>Words: {inputText.split(' ').length}</div>
            <div>Type: Natural language text</div>
          </div>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Processing Pipeline</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span>Tokenization</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Embedding Lookup</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Position Encoding</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TokenizationView = () => (
    <div className="space-y-8">
      <div className="overflow-x-auto">
        <table className="w-full text-sm font-mono">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left p-3 text-cyan-400">Token</th>
              <th className="text-left p-3 text-cyan-400">Token ID</th>
              <th className="text-left p-3 text-cyan-400">Position</th>
              <th className="text-left p-3 text-cyan-400">Type</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, i) => (
              <tr key={i} className="border-b border-gray-800 hover:bg-gray-900/50">
                <td className="p-3">
                  <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black px-3 py-1 rounded font-bold">
                    {token}
                  </span>
                </td>
                <td className="p-3 text-gray-300">{tokenIds[i]}</td>
                <td className="p-3 text-gray-300">{i}</td>
                <td className="p-3 text-gray-400">
                  {token.includes('[') ? 'Special' : 'Word'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Tokenization Details</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <div><span className="text-cyan-400">Algorithm:</span> WordPiece/BPE</div>
            <div><span className="text-cyan-400">Vocab Size:</span> 30,522 tokens</div>
            <div><span className="text-cyan-400">Special Tokens:</span> [CLS], [SEP], [PAD], [UNK]</div>
            <div><span className="text-cyan-400">Max Length:</span> 512 tokens</div>
          </div>
        </div>
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
          <h3 className="text-lg font-semibold text-cyan-400 mb-3">Token Statistics</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <div><span className="text-cyan-400">Total Tokens:</span> {tokens.length}</div>
            <div><span className="text-cyan-400">Content Tokens:</span> {tokens.filter(t => !t.includes('[')).length}</div>
            <div><span className="text-cyan-400">Special Tokens:</span> {tokens.filter(t => t.includes('[')).length}</div>
          </div>
        </div>
      </div>
    </div>
  );

  const EmbeddingView = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Embedding Matrix Visualization */}
        <div>
          <h3 className="text-xl font-semibold text-purple-400 mb-4">Token Embeddings (8D simplified)</h3>
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
            {tokens.map((token, i) => (
              <div key={i} className="mb-4 last:mb-0">
                <div className="flex items-center mb-2">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-black px-2 py-1 rounded text-sm font-bold mr-3">
                    {token}
                  </span>
                  <span className="text-gray-400 text-xs">ID: {tokenIds[i]}</span>
                </div>
                <div className="grid grid-cols-8 gap-1">
                  {embeddings[i].map((val, j) => (
                    <div
                      key={j}
                      className="h-6 rounded text-xs flex items-center justify-center font-mono"
                      style={{
                        backgroundColor: `rgba(147, 51, 234, ${Math.abs(val) * 0.8 + 0.2})`,
                        color: Math.abs(val) > 0.5 ? 'white' : 'black'
                      }}
                    >
                      {val.toFixed(1)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Embedding Space Visualization */}
        <div>
          <h3 className="text-xl font-semibold text-purple-400 mb-4">Embedding Space (2D Projection)</h3>
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-700 h-80 relative">
            <svg className="w-full h-full">
              {/* Grid */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Embedding points */}
              {embeddings.map((emb, i) => {
                const x = (emb[0] + 1) * 150 + 50;
                const y = (emb[1] + 1) * 120 + 30;
                return (
                  <g key={i}>
                    <circle
                      cx={x}
                      cy={y}
                      r="8"
                      fill="url(#grad)"
                      className="animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                    <text
                      x={x}
                      y={y - 15}
                      textAnchor="middle"
                      className="text-xs fill-purple-400 font-mono"
                    >
                      {tokens[i]}
                    </text>
                  </g>
                );
              })}
              
              <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
        <h3 className="text-lg font-semibold text-purple-400 mb-3">Embedding Properties</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
          <div>
            <span className="text-purple-400">Dimension:</span> d_model = 512 (768 for BERT-base)
          </div>
          <div>
            <span className="text-purple-400">Parameters:</span> vocab_size × d_model = 15.7M
          </div>
          <div>
            <span className="text-purple-400">Initialization:</span> Xavier/He Normal
          </div>
        </div>
      </div>
    </div>
  );

  const PositionalView = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Positional Encoding Patterns */}
        <div>
          <h3 className="text-xl font-semibold text-green-400 mb-4">Positional Encodings</h3>
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
            {tokens.map((token, pos) => (
              <div key={pos} className="mb-4 last:mb-0">
                <div className="flex items-center mb-2">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-black px-2 py-1 rounded text-sm font-bold mr-3">
                    pos={pos}
                  </span>
                  <span className="text-gray-400 text-xs">{token}</span>
                </div>
                <div className="grid grid-cols-8 gap-1">
                  {positionalEncodings[pos].map((val, i) => (
                    <div
                      key={i}
                      className="h-6 rounded text-xs flex items-center justify-center font-mono"
                      style={{
                        backgroundColor: val > 0 
                          ? `rgba(34, 197, 94, ${Math.abs(val) * 0.8 + 0.2})`
                          : `rgba(239, 68, 68, ${Math.abs(val) * 0.8 + 0.2})`,
                        color: Math.abs(val) > 0.5 ? 'white' : 'black'
                      }}
                    >
                      {val.toFixed(1)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sinusoidal Pattern Visualization */}
        <div>
          <h3 className="text-xl font-semibold text-green-400 mb-4">Sinusoidal Patterns</h3>
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-700 h-80">
            <svg className="w-full h-full">
              {/* Draw sinusoidal waves for different dimensions */}
              {[0, 1, 2, 3].map(dim => {
                const points = Array.from({length: 50}, (_, i) => {
                  const pos = i * 0.3;
                  const angle = pos / Math.pow(10000, (2 * Math.floor(dim/2)) / 8);
                  const val = dim % 2 === 0 ? Math.sin(angle) : Math.cos(angle);
                  return `${i * 6},${150 + val * 50}`;
                }).join(' ');
                
                return (
                  <polyline
                    key={dim}
                    points={points}
                    fill="none"
                    stroke={`hsl(${120 + dim * 30}, 70%, 60%)`}
                    strokeWidth="2"
                    className="animate-pulse"
                  />
                );
              })}
              
              {/* Position markers */}
              {tokens.map((_, pos) => (
                <line
                  key={pos}
                  x1={pos * 35 + 20}
                  y1="0"
                  x2={pos * 35 + 20}
                  y2="300"
                  stroke="#374151"
                  strokeDasharray="4,4"
                />
              ))}
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
        <h3 className="text-lg font-semibold text-green-400 mb-3">Positional Encoding Formula</h3>
        <div className="font-mono text-sm bg-black p-4 rounded border border-gray-600 text-green-300">
          <div>PE(pos, 2i) = sin(pos / 10000^(2i/d_model))</div>
          <div>PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))</div>
        </div>
        <div className="mt-3 text-sm text-gray-300">
          <span className="text-green-400">pos:</span> position in sequence, 
          <span className="text-green-400 ml-2">i:</span> dimension index,
          <span className="text-green-400 ml-2">d_model:</span> embedding dimension
        </div>
      </div>
    </div>
  );

  const AttentionView = () => {
    const [focusToken, setFocusToken] = useState(1);

    return (
      <div className="space-y-8">
        {/* Attention Matrix Heatmap */}
        <div>
          <h3 className="text-xl font-semibold text-orange-400 mb-4">Self-Attention Matrix</h3>
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
            <div className="grid gap-1" style={{gridTemplateColumns: `repeat(${tokens.length + 1}, 1fr)`}}>
              {/* Header row */}
              <div></div>
              {tokens.map((token, i) => (
                <div key={i} className="text-xs text-center text-orange-400 p-1 font-mono">
                  {token}
                </div>
              ))}
              
              {/* Attention weights */}
              {attentionWeights.map((row, i) => (
                <React.Fragment key={i}>
                  <div className="text-xs text-orange-400 p-1 font-mono">{tokens[i]}</div>
                  {row.map((weight, j) => (
                    <div
                      key={j}
                      className="h-8 flex items-center justify-center text-xs font-mono rounded cursor-pointer"
                      style={{
                        backgroundColor: `rgba(251, 146, 60, ${weight})`,
                        color: weight > 0.5 ? 'black' : 'white'
                      }}
                      onClick={() => setFocusToken(i)}
                    >
                      {weight.toFixed(2)}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Attention Head Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-orange-400 mb-4">
              Attention from "{tokens[focusToken]}" (click matrix to change)
            </h3>
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
              <div className="space-y-3">
                {tokens.map((token, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className={`px-3 py-1 rounded font-mono text-sm ${
                      i === focusToken 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                        : 'bg-gray-700 text-gray-300'
                    }`}>
                      {token}
                    </div>
                    <div className="flex-1 bg-gray-800 rounded-full h-4 relative">
                      <div
                        className="bg-gradient-to-r from-orange-400 to-red-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${attentionWeights[focusToken][i] * 100}%` }}
                      />
                      <span className="absolute right-2 top-0 text-xs text-gray-300 leading-4">
                        {(attentionWeights[focusToken][i] * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-orange-400 mb-4">Multi-Head Attention</h3>
            <div className="bg-gray-900 p-4 rounded-xl border border-gray-700 space-y-4">
              {[...Array(8)].map((_, head) => (
                <div key={head} className="space-y-2">
                  <div className="text-sm text-gray-400">Head {head + 1}</div>
                  <div className="grid grid-cols-8 gap-1">
                    {tokens.map((_, i) => (
                      <div
                        key={i}
                        className="h-6 rounded"
                        style={{
                          backgroundColor: `rgba(251, 146, 60, ${
                            attentionWeights[focusToken][i] * (0.8 + Math.random() * 0.4)
                          })`
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
          <h3 className="text-lg font-semibold text-orange-400 mb-3">Attention Mechanism</h3>
          <div className="font-mono text-sm bg-black p-4 rounded border border-gray-600 text-orange-300">
            <div>Attention(Q,K,V) = softmax(QK^T / √d_k)V</div>
            <div className="mt-2">MultiHead(Q,K,V) = Concat(head_1,...,head_h)W^O</div>
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div><span className="text-orange-400">Heads:</span> 12 (BERT-base)</div>
            <div><span className="text-orange-400">d_k:</span> d_model/h = 64</div>
            <div><span className="text-orange-400">Parameters:</span> 4 × d_model²</div>
          </div>
        </div>
      </div>
    );
  };

  const FeedForwardView = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* FFN Architecture */}
        <div>
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">Feed Forward Network</h3>
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
            {tokens.map((token, i) => (
              <div key={i} className="mb-6 last:mb-0">
                <div className="text-center mb-4">
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded font-mono">
                    {token}
                  </span>
                </div>
                
                {/* Layer visualization */}
                <div className="space-y-4">
                  {/* Input layer (d_model) */}
                  <div className="flex justify-center space-x-1">
                    {[...Array(8)].map((_, j) => (
                      <div
                        key={j}
                        className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse"
                        style={{ animationDelay: `${j * 0.1}s` }}
                      />
                    ))}
                  </div>
                  
                  <div className="text-center text-xs text-gray-400">Linear + ReLU</div>
                  
                  {/* Hidden layer (4 * d_model) */}
                  <div className="flex justify-center space-x-1">
                    {[...Array(16)].map((_, j) => (
                      <div
                        key={j}
                        className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                        style={{ animationDelay: `${j * 0.05}s` }}
                      />
                    ))}
                  </div>
                  
                  <div className="text-center text-xs text-gray-400">Linear</div>
                  
                  {/* Output layer (d_model) */}
                  <div className="flex justify-center space-x-1">
                    {[...Array(8)].map((_, j) => (
                      <div
                        key={j}
                        className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"
                        style={{ animationDelay: `${j * 0.1 + 0.5}s` }}
                      />
                    ))}
                  </div>
                </div>
                
                {i < tokens.length - 1 && <hr className="border-gray-700 mt-6" />}
              </div>
            ))}
          </div>
        </div>

        {/* Activation Functions */}
        <div>
          <h3 className="text-xl font-semibold text-indigo-400 mb-4">Activation Functions</h3>
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-700 space-y-6">
            {/* ReLU visualization */}
            <div>
              <h4 className="text-sm font-semibold text-indigo-300 mb-2">ReLU Activation</h4>
              <svg className="w-full h-32 bg-black rounded">
                <path
                  d="M 20 120 L 120 120 L 120 20 L 220 20"
                  stroke="#6366f1"
                  strokeWidth="3"
                  fill="none"
                />
                <text x="10" y="15" className="text-xs fill-gray-400">max(0,x)</text>
              </svg>
            </div>
            
            {/* GELU visualization */}
            <div>
              <h4 className="text-sm font-semibold text-indigo-300 mb-2">GELU Activation (BERT)</h4>
              <svg className="w-full h-32 bg-black rounded">
                <path
                  d="M 20 120 Q 70 110 120 60 T 220 20"
                  stroke="#8b5cf6"
                  strokeWidth="3"
                  fill="none"
                />
                <text x="10" y="15" className="text-xs fill-gray-400">0.5x(1+tanh(√(2/π)(x+0.044715x³)))</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
        <h3 className="text-lg font-semibold text-indigo-400 mb-3">Feed Forward Network Details</h3>
        <div className="font-mono text-sm bg-black p-4 rounded border border-gray-600 text-indigo-300 mb-4">
          <div>FFN(x) = max(0, xW₁ + b₁)W₂ + b₂</div>
          <div>GELU(x) = 0.5x(1 + tanh(√(2/π)(x + 0.044715x³)))</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-300">
          <div><span className="text-indigo-400">Hidden Size:</span> 4 × d_model</div>
          <div><span className="text-indigo-400">Parameters:</span> 2 × d_model × 4d_model</div>
          <div><span className="text-indigo-400">Activation:</span> ReLU/GELU</div>
          <div><span className="text-indigo-400">Dropout:</span> 0.1</div>
        </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentStep) {
      case 0: return <InputTextView />;
      case 1: return <TokenizationView />;
      case 2: return <EmbeddingView />;
      case 3: return <PositionalView />;
      case 4: return <AttentionView />;
      case 5: return <FeedForwardView />;
      default: return <InputTextView />;
    }
  };

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          🔬 Technical Transformer Architecture
        </h1>
        <p className="text-center text-gray-400 mb-12 text-lg">
          Deep dive into the mathematical foundations of transformer models
        </p>
        
        {/* Step Navigation */}
        <div className="flex flex-wrap justify-center mb-12 gap-3">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl transition-all duration-300 border ${
                  index === currentStep
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border-cyan-500/50 shadow-lg shadow-cyan-500/20'
                    : 'bg-gray-900/50 text-gray-400 border-gray-700 hover:border-gray-600 hover:text-gray-300'
                }`}
              >
                <StepIcon size={20} />
                <span className="font-medium">{step.name}</span>
              </button>
            );
          })}
        </div>

        {/* Current Step Header */}
        <div className="text-center mb-8 p-8 rounded-2xl bg-gradient-to-r from-gray-900/80 to-gray-800/80 border border-gray-700 shadow-2xl">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <CurrentIcon size={40} className="text-cyan-400" />
            <h2 className="text-3xl font-bold text-white">{steps[currentStep].name}</h2>
          </div>
          <p className="text-xl text-gray-300">{steps[currentStep].description}</p>
        </div>

        {/* Main Visualization Area */}
        <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-8 border border-gray-700 shadow-2xl backdrop-blur-sm">
          {renderCurrentView()}
        </div>

        {/* Technical Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>🎓 Educational visualization of transformer architecture components</p>
          <p className="mt-2">Based on "Attention Is All You Need" (Vaswani et al., 2017)</p>
        </div>
      </div>
    </div>
  );
};

export default TechnicalTransformerVisualizer;