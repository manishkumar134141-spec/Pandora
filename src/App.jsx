import React, { useState, useEffect } from "react";
import { encodingForModel } from "js-tiktoken";

// Initialize tokenizers globally to prevent lag
const encGPT4o = encodingForModel("gpt-4o");
const encGPT4 = encodingForModel("gpt-4");

const PRICING_RATES = {
  gpt5_5: { name: "GPT-5.5", pricePerM: 5.00, isClaude: false },
  gpt5_4: { name: "GPT-5.4", pricePerM: 2.50, isClaude: false },
  gpt5_4_mini: { name: "GPT-5.4-mini", pricePerM: 0.75, isClaude: false },
  gpt5_4_nano: { name: "GPT-5.4-nano", pricePerM: 0.20, isClaude: false },
  claude_fable_5: { name: "Claude Fable 5", pricePerM: 10.00, isClaude: true },
  claude_opus: { name: "Claude Opus 4.8", pricePerM: 5.00, isClaude: true },
  claude_sonnet: { name: "Claude Sonnet 4.6", pricePerM: 3.00, isClaude: true },
  claude_haiku: { name: "Claude Haiku 4.5", pricePerM: 1.00, isClaude: true },
};

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [tokenCounts, setTokenCounts] = useState({ gpt4o: 0, gpt4: 0 });
  
  // Hackathon Mock Auth States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // New States for AI Output
  const [aiResponse, setAiResponse] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Tokenization Engine Logic
  useEffect(() => {
    if (!prompt) {
      setTokenCounts({ gpt4o: 0, gpt4: 0 });
      setAiResponse(""); // Clear response when prompt is empty
      return;
    }
    try {
      setTokenCounts({
        gpt4o: encGPT4o.encode(prompt).length,
        gpt4: encGPT4.encode(prompt).length,
      });
    } catch (error) {
      console.error("Tokenization error:", error);
    }
  }, [prompt]);

  const wordCount = prompt.trim() ? prompt.trim().split(/\s+/).length : 0;
  const charCount = prompt.length;

  const getModelMetrics = (modelKey) => {
    const model = PRICING_RATES[modelKey];
    const sourceTokens = tokenCounts.gpt4o;
    const finalTokens = model.isClaude ? Math.ceil(sourceTokens * 1.3) : sourceTokens;
    const rawCost = (finalTokens / 1000000) * model.pricePerM;
    return { tokens: finalTokens, cost: `$${rawCost.toFixed(6)}` };
  };

  // Hackathon Mock Login
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setShowAuthModal(false);
      setAuthEmail("");
      setAuthPassword("");
      setAuthLoading(false);
    }, 600);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setAiResponse("");
  };

  const handleProtectedAction = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      document.getElementById('calc').scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 🔥 HACKATHON FAILSAFE: MOCK AI INTEGRATION 🔥
  const generateAIResponse = () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setAiResponse("");

    // Simulate realistic network delay (1.2 seconds)
    setTimeout(() => {
      const fakeResponse = `Analysis Complete: Based on the payload's complexity and predicted token count, I recommend routing this workload to a Local AMD Inference node.\n\n• Semantic Cache Hit Probability: 0%\n• Latency Optimization: +45ms\n• Recommended Model: Llama-3-8B-Instruct\n\nRouting this request locally will minimize latency while maintaining absolute cost-efficiency for the developer.`;
      
      setAiResponse(fakeResponse);
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="pandora-ui">
      <style>{`
        html, body, #root { margin: 0 !important; padding: 0 !important; width: 100% !important; max-width: 100vw !important; min-height: 100vh !important; background-color: #f8fbff !important; border: none !important; }
        .pandora-ui { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #f8fbff; background-image: radial-gradient(at 0% 0%, rgba(244, 247, 254, 0.8) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(235, 243, 254, 0.8) 0px, transparent 50%); color: #0b0f19; min-height: 100vh; width: 100%; -webkit-font-smoothing: antialiased; }
        .p-nav { display: flex; justify-content: space-between; align-items: center; padding: 24px 40px; max-width: 1200px; margin: 0 auto; box-sizing: border-box; }
        .p-brand { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 16px; }
        .p-logo { background: #000; color: #fff; width: 28px; height: 28px; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 14px; }
        .p-actions { display: flex; align-items: center; gap: 16px; margin-left: auto; }
        .p-btn-clear { background: none; border: none; font-size: 14px; font-weight: 600; cursor: pointer; color: #0b0f19; }
        .p-btn-black { background: #0b0f19; color: #fff; border: none; padding: 10px 20px; border-radius: 30px; font-size: 14px; font-weight: 600; cursor: pointer; }
        
        .p-hero { text-align: center; padding: 60px 20px 40px; max-width: 800px; margin: 0 auto; box-sizing: border-box; }
        .p-badge { background: #e2e8f0; color: #475569; font-size: 11px; font-weight: 700; letter-spacing: 1px; padding: 6px 16px; border-radius: 20px; display: inline-block; margin-bottom: 24px; }
        .p-hero h1 { font-size: 64px; font-weight: 800; letter-spacing: -2px; margin: 0 0 20px 0; }
        .p-hero p { font-size: 18px; color: #64748b; line-height: 1.6; margin: 0 auto 32px; max-width: 650px; }
        .p-hero-btns { display: flex; justify-content: center; gap: 16px; }
        .p-btn-hero-black { background: #0b0f19; color: #fff; border: none; padding: 12px 36px; border-radius: 30px; font-size: 15px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }

        .p-main-card { background: #fff; max-width: 900px; margin: 0 auto 40px; border-radius: 24px; padding: 32px; box-shadow: 0 20px 40px -15px rgba(0,0,0,0.05); border: 1px solid #f1f5f9; box-sizing: border-box; position: relative; }
        .p-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; }
        .p-subtitle { font-size: 12px; font-weight: 700; color: #94a3b8; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; display: block; }
        .p-card-header h2 { font-size: 24px; font-weight: 700; margin: 0; text-align: left; }

        .p-input-wrapper { background: #0b0f19; border-radius: 20px; padding: 8px 8px 8px 20px; display: flex; align-items: center; gap: 12px; box-sizing: border-box; }
        .p-input { flex: 1; background: transparent; border: none; color: #fff; font-size: 15px; outline: none; padding: 12px 0; font-family: inherit; }
        .p-input::placeholder { color: #64748b; }
        
        .p-run-btn { background: #1e293b; color: #fff; border: none; padding: 8px 20px; border-radius: 16px; font-size: 13px; font-weight: 700; cursor: pointer; transition: 0.2s; white-space: nowrap; }
        .p-run-btn:hover { background: #334155; }
        .p-run-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .ai-response-box { margin-top: 24px; padding: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; color: #334155; line-height: 1.6; font-size: 15px; text-align: left; white-space: pre-wrap;}
        .ai-response-title { font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 1px; display: flex; align-items: center; gap: 6px;}

        .p-table { width: 100%; border-collapse: collapse; margin-top: 32px; }
        .p-table th { text-align: left; padding: 12px 0; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600; }
        .p-table td { padding: 16px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #0b0f19; text-align: left; }
        .p-table tr:last-child td { border-bottom: none; }
        .p-cost { font-weight: 700; text-align: right !important; font-family: monospace; font-size: 15px; }

        .p-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; max-width: 900px; margin: 0 auto 60px; box-sizing: border-box; }
        .p-grid-card { background: #fff; border-radius: 20px; padding: 24px; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; display: flex; flex-direction: column; box-sizing: border-box; text-align: left; }
        .p-icon { width: 40px; height: 40px; background: #64748b; border-radius: 12px; margin-bottom: 16px; display: flex; justify-content: center; align-items: center; color: white; font-size: 18px; }
        .p-icon.ic-1 { background: #475569; }
        .p-icon.ic-2 { background: #94a3b8; }
        .p-icon.ic-3 { background: #0f172a; }
        .p-icon.ic-4 { background: #1e293b; }
        .p-grid-card h3 { font-size: 16px; font-weight: 700; margin: 0 0 8px 0; }
        .p-grid-card p { font-size: 13px; color: #64748b; margin: 0; line-height: 1.5; }
        .p-metric { font-size: 32px; font-weight: 800; margin-top: auto; padding-top: 20px; color: #0b0f19; }

        .p-footer { max-width: 1200px; margin: 0 auto; padding: 40px; border-top: 1px solid #e2e8f0; display: flex; justify-content: space-between; margin-top: 40px; box-sizing: border-box; }
        .p-footer p { color: #64748b; font-size: 13px; max-width: 500px; line-height: 1.6; text-align: left; }

        .auth-gate-overlay { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255, 255, 255, 0.4); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border-radius: 24px; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 10; }
        .auth-gate-btn { background: #0b0f19; color: white; border: none; padding: 14px 28px; border-radius: 30px; font-size: 15px; font-weight: 600; cursor: pointer; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .modal-backdrop { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(9, 13, 22, 0.3); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; z-index: 100; }
        .modal-box { background: white; width: 100%; max-width: 400px; padding: 40px; border-radius: 24px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1); border: 1px solid #f1f5f9; box-sizing: border-box; position: relative; }
        .modal-close { position: absolute; top: 20px; right: 20px; background: none; border: none; font-size: 20px; cursor: pointer; color: #94a3b8; }
        .form-group { margin-bottom: 20px; }
        .form-group label { display: block; font-size: 13px; font-weight: 600; color: #475569; margin-bottom: 8px; }
        .form-input { width: 100%; padding: 12px 16px; border: 1px solid #e2e8f0; border-radius: 12px; font-size: 15px; outline: none; box-sizing: border-box; }
        .form-input:focus { border-color: #0b0f19; }
        .auth-submit-btn { width: 100%; background: #0b0f19; color: white; border: none; padding: 14px; border-radius: 12px; font-size: 15px; font-weight: 600; cursor: pointer; margin-top: 10px; opacity: 1; transition: opacity 0.2s; }
        .auth-submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      {/* Navbar */}
      <nav className="p-nav">
        <div className="p-brand">
          <div className="p-logo">P</div>
          Pandora
        </div>
        <div className="p-actions">
          {isAuthenticated ? (
            <button className="p-btn-clear" onClick={handleSignOut}>Sign Out</button>
          ) : (
            <>
              <button className="p-btn-clear" onClick={() => setShowAuthModal(true)}>Sign In</button>
              <button className="p-btn-black" onClick={() => setShowAuthModal(true)}>Get started</button>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <header className="p-hero">
        <div className="p-badge">INTELLIGENT PROMPT ROUTING FOR MODERN DEV TEAMS</div>
        <h1>Pandora</h1>
        <p>The Intelligent AI Routing Platform. Route developer prompts through semantic cache, local AMD inference, and cloud AI with confidence.</p>
        <div className="p-hero-btns">
          <button className="p-btn-hero-black" onClick={handleProtectedAction}>
            Start building
          </button>
        </div>
      </header>

      {/* Main Interactive Canvas */}
      <main className="p-main-card" id="calc">
        {!isAuthenticated && (
          <div className="auth-gate-overlay">
            <h3 style={{marginBottom: '16px', fontWeight: 700}}>Sign in to unlock prompt prediction</h3>
            <button className="auth-gate-btn" onClick={() => setShowAuthModal(true)}>
              Unlock Workspace
            </button>
          </div>
        )}

        <div className="p-card-header">
          <div>
            <span className="p-subtitle">PROMPT ROUTING PREVIEW</span>
            <h2>Built for lightning-fast AI decisions.</h2>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-input-wrapper">
          <input 
            type="text" 
            className="p-input" 
            placeholder="Ask Pandora which route serves this prompt best..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={!isAuthenticated || isGenerating}
          />
          {isAuthenticated && prompt.trim() && (
             <button 
               className="p-run-btn" 
               onClick={generateAIResponse}
               disabled={isGenerating}
             >
               {isGenerating ? "⚡ Running..." : "Execute 🚀"}
             </button>
          )}
        </div>

        {/* Mock AI Output Box */}
        {aiResponse && (
          <div className="ai-response-box">
             <div className="ai-response-title">🎆 Pandora Routing Engine</div>
             {aiResponse}
          </div>
        )}

        {/* Cost Estimation Table */}
        {prompt && isAuthenticated && (
          <table className="p-table">
            <thead>
              <tr>
                <th>Model Tier</th>
                <th>Rate / 1M Tokens</th>
                <th>Predicted Tokens</th>
                <th style={{textAlign: 'right'}}>Est. Input Cost</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(PRICING_RATES).map((key) => {
                const metrics = getModelMetrics(key);
                const model = PRICING_RATES[key];
                return (
                  <tr key={key}>
                    <td style={{fontWeight: 600}}>{model.name}</td>
                    <td style={{color: '#64748b'}}>${model.pricePerM.toFixed(2)}</td>
                    <td style={{color: '#64748b'}}>{metrics.tokens.toLocaleString()}</td>
                    <td className="p-cost">{metrics.cost}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>

      {/* Bottom Data Grid */}
      <div className="p-grid">
        <div className="p-grid-card">
          <div className="p-icon ic-1">🗄️</div>
          <h3>GPT-5 Tokens</h3>
          <p>Chunk capacity optimized for next-gen models.</p>
          <div className="p-metric">{isAuthenticated ? tokenCounts.gpt4o.toLocaleString() : "0"}</div>
        </div>
        <div className="p-grid-card">
          <div className="p-icon ic-2">⚙️</div>
          <h3>Legacy Tokens</h3>
          <p>Backward-compatible counts across standard models.</p>
          <div className="p-metric">{isAuthenticated ? tokenCounts.gpt4.toLocaleString() : "0"}</div>
        </div>
        <div className="p-grid-card">
          <div className="p-icon ic-3">📚</div>
          <h3>Word Count</h3>
          <p>Total separation of natural strings and spaces.</p>
          <div className="p-metric">{isAuthenticated ? wordCount.toLocaleString() : "0"}</div>
        </div>
        <div className="p-grid-card">
          <div className="p-icon ic-4">🖥️</div>
          <h3>Characters</h3>
          <p>Absolute tracking size for payload analysis.</p>
          <div className="p-metric">{isAuthenticated ? charCount.toLocaleString() : "0"}</div>
        </div>
      </div>

      <footer className="p-footer">
        <div>
          <h4 style={{margin: '0 0 12px 0', letterSpacing: '2px', fontSize: '14px', textAlign: 'left'}}>PANDORA</h4>
          <p>A modern platform for routing AI workloads across cache, local AMD compute, and cloud inference with confidence.</p>
        </div>
      </footer>

      {/* Auth Modal Popover */}
      {showAuthModal && (
        <div className="modal-backdrop" onClick={() => setShowAuthModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAuthModal(false)}>×</button>
            <h2 style={{margin: '0 0 8px 0', fontSize: '24px', fontWeight: 800}}>Welcome back</h2>
            <p style={{color: '#64748b', fontSize: '14px', marginBottom: '24px'}}>Enter your details to access the preview dashboard.</p>
            
            <form onSubmit={handleSignInSubmit}>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="name@company.com" 
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input 
                  type="password" 
                  className="form-input" 
                  placeholder="••••••••" 
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="auth-submit-btn" disabled={authLoading}>
                {authLoading ? "Authenticating..." : "Sign In / Register"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}