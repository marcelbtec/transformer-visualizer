import React, { useState } from 'react';
import { Book, ArrowRight, Brain, Zap, Target, Grid, Hash, Eye, ChevronDown, ChevronUp, ExternalLink, Code, Users } from 'lucide-react';

const DocumentationPage = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const ExpandableSection = ({ id, title, icon: Icon, children, defaultExpanded = false }) => {
    const isExpanded = expandedSections[id] ?? defaultExpanded;
    
    return (
      <div className="bg-gray-900/50 rounded-xl border border-gray-700 overflow-hidden">
        <button
          onClick={() => toggleSection(id)}
          className="w-full p-6 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Icon className="text-cyan-400" size={24} />
            <h3 className="text-xl font-semibold text-white">{title}</h3>
          </div>
          {isExpanded ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
        </button>
        {isExpanded && (
          <div className="px-6 pb-6 border-t border-gray-700">
            <div className="pt-4">
              {children}
            </div>
          </div>
        )}
      </div>
    );
  };

  const MathFormula = ({ children, title }) => (
    <div className="bg-black p-4 rounded-lg border border-gray-600 my-4">
      {title && <div className="text-cyan-400 text-sm font-semibold mb-2">{title}</div>}
      <div className="font-mono text-green-300 text-sm">
        {children}
      </div>
    </div>
  );

  const CodeBlock = ({ children, language = "python" }) => (
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-600 my-4">
      <div className="text-gray-400 text-xs mb-2">{language}</div>
      <pre className="font-mono text-sm text-gray-300 overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Book className="text-cyan-400" size={40} />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Transformer Architecture
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive guide to understanding the mathematical foundations and architectural components 
            of transformer models that revolutionized natural language processing.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-xl p-6 mb-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center">
            <Grid className="mr-3" size={24} />
            Table of Contents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <a href="#overview" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                <ArrowRight size={16} className="mr-2" />
                Architecture Overview
              </a>
              <a href="#tokenization" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                <ArrowRight size={16} className="mr-2" />
                Tokenization Process
              </a>
              <a href="#embeddings" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                <ArrowRight size={16} className="mr-2" />
                Token Embeddings
              </a>
            </div>
            <div className="space-y-2">
              <a href="#positional" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                <ArrowRight size={16} className="mr-2" />
                Positional Encoding
              </a>
              <a href="#attention" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                <ArrowRight size={16} className="mr-2" />
                Self-Attention Mechanism
              </a>
              <a href="#feedforward" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                <ArrowRight size={16} className="mr-2" />
                Feed Forward Networks
              </a>
            </div>
          </div>
        </div>

        {/* Documentation Sections */}
        <div className="space-y-6">
          
          {/* Architecture Overview */}
          <ExpandableSection id="overview" title="Architecture Overview" icon={Eye} defaultExpanded={true}>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg leading-relaxed">
                The Transformer architecture, introduced in "Attention Is All You Need" (Vaswani et al., 2017), 
                revolutionized natural language processing by replacing recurrent and convolutional layers with 
                self-attention mechanisms. This parallel processing capability dramatically improved training efficiency 
                and model performance.
              </p>
              
              <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-600">
                <h4 className="text-lg font-semibold text-cyan-400 mb-3">Key Innovations</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Self-Attention</h5>
                    <p className="text-sm">Allows tokens to attend to all other tokens simultaneously, capturing long-range dependencies.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Parallel Processing</h5>
                    <p className="text-sm">Unlike RNNs, transformers process entire sequences simultaneously, enabling efficient training.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Multi-Head Attention</h5>
                    <p className="text-sm">Multiple attention heads capture different types of relationships between tokens.</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-white mb-2">Positional Encoding</h5>
                    <p className="text-sm">Injects position information since attention is order-agnostic by design.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 p-6 rounded-lg border border-purple-500/30">
                <h4 className="text-lg font-semibold text-purple-300 mb-3">Processing Pipeline</h4>
                <div className="flex flex-wrap items-center justify-center space-x-4 text-sm">
                  <div className="bg-cyan-500/20 px-3 py-2 rounded border border-cyan-500/50">Input Text</div>
                  <ArrowRight className="text-gray-400" size={16} />
                  <div className="bg-blue-500/20 px-3 py-2 rounded border border-blue-500/50">Tokenization</div>
                  <ArrowRight className="text-gray-400" size={16} />
                  <div className="bg-purple-500/20 px-3 py-2 rounded border border-purple-500/50">Embeddings</div>
                  <ArrowRight className="text-gray-400" size={16} />
                  <div className="bg-green-500/20 px-3 py-2 rounded border border-green-500/50">Pos. Encoding</div>
                  <ArrowRight className="text-gray-400" size={16} />
                  <div className="bg-orange-500/20 px-3 py-2 rounded border border-orange-500/50">Attention</div>
                  <ArrowRight className="text-gray-400" size={16} />
                  <div className="bg-indigo-500/20 px-3 py-2 rounded border border-indigo-500/50">Feed Forward</div>
                </div>
              </div>
            </div>
          </ExpandableSection>

          {/* Tokenization */}
          <ExpandableSection id="tokenization" title="Tokenization Process" icon={Hash}>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                Tokenization converts raw text into a sequence of discrete tokens that the model can process. 
                Modern transformers use subword tokenization algorithms like WordPiece (BERT) or Byte-Pair Encoding (GPT) 
                to handle vocabulary efficiently while managing out-of-vocabulary words.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-600">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-3">WordPiece Algorithm</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Starts with character-level vocabulary</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Iteratively merges most frequent pairs</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Balances vocabulary size vs. sequence length</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Handles rare words through subword units</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-600">
                  <h4 className="text-lg font-semibold text-cyan-400 mb-3">Special Tokens</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-3">
                      <span className="bg-cyan-500 text-black px-2 py-1 rounded font-mono text-xs">[CLS]</span>
                      <span>Classification token (BERT)</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="bg-cyan-500 text-black px-2 py-1 rounded font-mono text-xs">[SEP]</span>
                      <span>Separator token</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="bg-cyan-500 text-black px-2 py-1 rounded font-mono text-xs">[PAD]</span>
                      <span>Padding for batch processing</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="bg-cyan-500 text-black px-2 py-1 rounded font-mono text-xs">[UNK]</span>
                      <span>Unknown/out-of-vocabulary</span>
                    </div>
                  </div>
                </div>
              </div>

              <CodeBlock language="python">
{`# Example tokenization process
from transformers import BertTokenizer

tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
text = "The cat sat on the mat"

# Tokenize
tokens = tokenizer.tokenize(text)
# ['the', 'cat', 'sat', 'on', 'the', 'mat']

# Convert to IDs
token_ids = tokenizer.convert_tokens_to_ids(tokens)
# [1996, 4937, 2938, 2006, 1996, 13523]

# Add special tokens
input_ids = tokenizer.encode(text, add_special_tokens=True)
# [101, 1996, 4937, 2938, 2006, 1996, 13523, 102]`}
              </CodeBlock>
            </div>
          </ExpandableSection>

          {/* Embeddings */}
          <ExpandableSection id="embeddings" title="Token Embeddings" icon={Brain}>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                Token embeddings convert discrete token IDs into dense, continuous vector representations. 
                These learned vectors capture semantic relationships between tokens, with similar tokens 
                having similar embeddings in the high-dimensional space.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-600">
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">Embedding Properties</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-purple-300">Dimension (BERT-base):</span>
                      <span className="font-mono">768</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-300">Vocabulary Size:</span>
                      <span className="font-mono">30,522</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-300">Parameters:</span>
                      <span className="font-mono">23.4M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-purple-300">Initialization:</span>
                      <span className="font-mono">Normal(0, 0.02)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-600">
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">Semantic Relationships</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <span>Similar words cluster in embedding space</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <span>Cosine similarity measures relatedness</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <span>Learned through backpropagation</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                      <span>Transferable across tasks</span>
                    </div>
                  </div>
                </div>
              </div>

              <MathFormula title="Embedding Lookup">
                E = TokenEmbedding[token_id]<br/>
                where E ∈ ℝ^d_model
              </MathFormula>

              <CodeBlock language="python">
{`# Embedding layer implementation
import torch.nn as nn

class TokenEmbedding(nn.Module):
    def __init__(self, vocab_size, d_model):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, d_model)
        self.d_model = d_model
    
    def forward(self, x):
        # Scale embeddings by sqrt(d_model) as in original paper
        return self.embedding(x) * math.sqrt(self.d_model)`}
              </CodeBlock>
            </div>
          </ExpandableSection>

          {/* Positional Encoding */}
          <ExpandableSection id="positional" title="Positional Encoding" icon={Target}>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                Since attention mechanisms are permutation-invariant, transformers need explicit position information. 
                Positional encoding adds sinusoidal patterns to embeddings, allowing the model to understand token 
                order and relative positions within sequences.
              </p>

              <MathFormula title="Sinusoidal Positional Encoding">
                PE(pos, 2i) = sin(pos / 10000^(2i/d_model))<br/>
                PE(pos, 2i+1) = cos(pos / 10000^(2i/d_model))<br/><br/>
                Final Input = TokenEmbedding + PositionalEncoding
              </MathFormula>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-600">
                  <h4 className="text-lg font-semibold text-green-400 mb-3">Why Sinusoidal?</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Deterministic patterns for consistent positions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Linear combinations encode relative positions</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Generalizes to longer sequences than seen in training</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Each dimension has different wavelength</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-600">
                  <h4 className="text-lg font-semibold text-green-400 mb-3">Pattern Characteristics</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-green-300 font-semibold">Low dimensions:</span>
                      <div className="text-gray-300">High frequency, fine-grained position</div>
                    </div>
                    <div>
                      <span className="text-green-300 font-semibold">High dimensions:</span>
                      <div className="text-gray-300">Low frequency, coarse-grained position</div>
                    </div>
                    <div>
                      <span className="text-green-300 font-semibold">Relative position:</span>
                      <div className="text-gray-300">Linear combination of absolute encodings</div>
                    </div>
                  </div>
                </div>
              </div>

              <CodeBlock language="python">
{`# Positional encoding implementation
import torch
import math

def positional_encoding(max_len, d_model):
    pe = torch.zeros(max_len, d_model)
    position = torch.arange(0, max_len).unsqueeze(1).float()
    
    div_term = torch.exp(torch.arange(0, d_model, 2).float() * 
                        -(math.log(10000.0) / d_model))
    
    pe[:, 0::2] = torch.sin(position * div_term)  # Even dimensions
    pe[:, 1::2] = torch.cos(position * div_term)  # Odd dimensions
    
    return pe`}
              </CodeBlock>
            </div>
          </ExpandableSection>

          {/* Attention Mechanism */}
          <ExpandableSection id="attention" title="Self-Attention Mechanism" icon={Zap}>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                Self-attention is the core innovation of transformers. It allows each token to attend to all other 
                tokens in the sequence, computing dynamic weights based on content similarity. This mechanism 
                captures long-range dependencies and complex relationships between words.
              </p>

              <MathFormula title="Scaled Dot-Product Attention">
                Attention(Q, K, V) = softmax(QK^T / √d_k)V<br/><br/>
                where:<br/>
                Q = XW_Q (Query matrix)<br/>
                K = XW_K (Key matrix)<br/>
                V = XW_V (Value matrix)
              </MathFormula>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-600">
                  <h4 className="text-lg font-semibold text-orange-400 mb-3">Attention Components</h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-orange-300 font-semibold">Query (Q):</span>
                      <div className="text-gray-300">"What am I looking for?"</div>
                    </div>
                    <div>
                      <span className="text-orange-300 font-semibold">Key (K):</span>
                      <div className="text-gray-300">"What can I be matched with?"</div>
                    </div>
                    <div>
                      <span className="text-orange-300 font-semibold">Value (V):</span>
                      <div className="text-gray-300">"What information do I contain?"</div>
                    </div>
                    <div>
                      <span className="text-orange-300 font-semibold">Scaling:</span>
                      <div className="text-gray-300">√d_k prevents vanishing gradients</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-600">
                  <h4 className="text-lg font-semibold text-orange-400 mb-3">Multi-Head Attention</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      <span>8-16 parallel attention heads</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      <span>Each head learns different relationships</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      <span>Heads concatenated and projected</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      <span>Enables rich representation learning</span>
                    </div>
                  </div>
                </div>
              </div>

              <MathFormula title="Multi-Head Attention">
                MultiHead(Q, K, V) = Concat(head_1, ..., head_h)W^O<br/>
                where head_i = Attention(QW_i^Q, KW_i^K, VW_i^V)
              </MathFormula>

              <CodeBlock language="python">
{`# Multi-head attention implementation
class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, n_heads):
        super().__init__()
        self.d_model = d_model
        self.n_heads = n_heads
        self.d_k = d_model // n_heads
        
        self.w_q = nn.Linear(d_model, d_model)
        self.w_k = nn.Linear(d_model, d_model)
        self.w_v = nn.Linear(d_model, d_model)
        self.w_o = nn.Linear(d_model, d_model)
        
    def forward(self, x):
        batch_size, seq_len = x.size(0), x.size(1)
        
        # Linear projections
        Q = self.w_q(x).view(batch_size, seq_len, self.n_heads, self.d_k)
        K = self.w_k(x).view(batch_size, seq_len, self.n_heads, self.d_k)
        V = self.w_v(x).view(batch_size, seq_len, self.n_heads, self.d_k)
        
        # Scaled dot-product attention
        scores = torch.matmul(Q, K.transpose(-2, -1)) / math.sqrt(self.d_k)
        attention_weights = F.softmax(scores, dim=-1)
        attended_values = torch.matmul(attention_weights, V)
        
        # Concatenate heads and project
        output = attended_values.contiguous().view(batch_size, seq_len, self.d_model)
        return self.w_o(output)`}
              </CodeBlock>
            </div>
          </ExpandableSection>

          {/* Feed Forward Networks */}
          <ExpandableSection id="feedforward" title="Feed Forward Networks" icon={ArrowRight}>
            <div className="space-y-4 text-gray-300">
              <p className="leading-relaxed">
                After attention mechanisms capture relationships between tokens, feed-forward networks process 
                each position independently. These networks consist of two linear transformations with a 
                non-linear activation function, significantly expanding the model's capacity to learn complex patterns.
              </p>

              <MathFormula title="Feed Forward Network">
                FFN(x) = max(0, xW_1 + b_1)W_2 + b_2<br/>
                GELU(x) = 0.5x(1 + tanh(√(2/π)(x + 0.044715x³)))
              </MathFormula>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-600">
                  <h4 className="text-lg font-semibold text-indigo-400 mb-3">Network Architecture</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-indigo-300">Input dimension:</span>
                      <span className="font-mono">d_model (512/768)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-indigo-300">Hidden dimension:</span>
                      <span className="font-mono">4 × d_model</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-indigo-300">Activation:</span>
                      <span className="font-mono">ReLU/GELU</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-indigo-300">Parameters:</span>
                      <span className="font-mono">2 × d_model × 4d_model</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-600">
                  <h4 className="text-lg font-semibold text-indigo-400 mb-3">Key Features</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Position-wise processing (each token independently)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Significant parameter count (65% of total)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Non-linear transformation increases capacity</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Residual connections and layer normalization</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 p-6 rounded-lg border border-purple-500/30">
                <h4 className="text-lg font-semibold text-purple-300 mb-3">Activation Functions Comparison</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-purple-300 font-semibold">ReLU:</span>
                    <div className="text-gray-300">Simple, fast, sparse activations</div>
                  </div>
                  <div>
                    <span className="text-purple-300 font-semibold">GELU:</span>
                    <div className="text-gray-300">Smooth, probabilistic, better gradients</div>
                  </div>
                  <div>
                    <span className="text-purple-300 font-semibold">SwishGLU:</span>
                    <div className="text-gray-300">Recent improvement, gated mechanism</div>
                  </div>
                </div>
              </div>

              <CodeBlock language="python">
{`# Feed forward network implementation
class FeedForward(nn.Module):
    def __init__(self, d_model, d_ff, dropout=0.1):
        super().__init__()
        self.linear1 = nn.Linear(d_model, d_ff)
        self.linear2 = nn.Linear(d_ff, d_model)
        self.dropout = nn.Dropout(dropout)
        self.activation = nn.GELU()  # or nn.ReLU()
        
    def forward(self, x):
        # First linear transformation + activation
        x = self.activation(self.linear1(x))
        x = self.dropout(x)
        
        # Second linear transformation
        x = self.linear2(x)
        return x

# Complete transformer block
class TransformerBlock(nn.Module):
    def __init__(self, d_model, n_heads, d_ff, dropout=0.1):
        super().__init__()
        self.attention = MultiHeadAttention(d_model, n_heads)
        self.feed_forward = FeedForward(d_model, d_ff, dropout)
        self.norm1 = nn.LayerNorm(d_model)
        self.norm2 = nn.LayerNorm(d_model)
        self.dropout = nn.Dropout(dropout)
        
    def forward(self, x):
        # Self-attention with residual connection
        attended = self.attention(x)
        x = self.norm1(x + self.dropout(attended))
        
        # Feed forward with residual connection
        fed_forward = self.feed_forward(x)
        x = self.norm2(x + self.dropout(fed_forward))
        
        return x`}
              </CodeBlock>
            </div>
          </ExpandableSection>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center space-y-4">
          <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/80 rounded-xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">Further Reading</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <a href="https://arxiv.org/abs/1706.03762" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                  <ExternalLink size={16} className="mr-2" />
                  "Attention Is All You Need" (Original Paper)
                </a>
                <a href="https://jalammar.github.io/illustrated-transformer/" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                  <ExternalLink size={16} className="mr-2" />
                  The Illustrated Transformer
                </a>
                <a href="https://huggingface.co/course/chapter1/1" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                  <ExternalLink size={16} className="mr-2" />
                  Hugging Face NLP Course
                </a>
              </div>
              <div className="space-y-3">
                <a href="https://arxiv.org/abs/1810.04805" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                  <ExternalLink size={16} className="mr-2" />
                  BERT: Pre-training of Deep Bidirectional Transformers
                </a>
                <a href="https://openai.com/research/language-unsupervised" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                  <ExternalLink size={16} className="mr-2" />
                  GPT: Improving Language Understanding
                </a>
                <a href="https://pytorch.org/tutorials/beginner/transformer_tutorial.html" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                  <ExternalLink size={16} className="mr-2" />
                  PyTorch Transformer Tutorial
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-gray-500 text-sm">
            <p>🎓 Educational documentation for transformer architecture components</p>
            <p className="mt-2">Based on "Attention Is All You Need" (Vaswani et al., 2017) and subsequent research</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;