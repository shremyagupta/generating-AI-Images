import { useState, useEffect } from 'react'

const ASPECT_RATIOS = [
  { id: 'square', label: '1:1 Square', width: 1024, height: 1024 },
  { id: 'portrait', label: '9:16 Portrait', width: 768, height: 1024 },
  { id: 'landscape', label: '16:9 Landscape', width: 1024, height: 768 }
]

const SURPRISE_PROMPTS = [
  "A cozy sunlit room with plants, a comfortable reading chair, and a sleeping cat, digital art, warm colors",
  "A beautiful serene lake at sunset with pastel pink and purple clouds reflecting on the water",
  "A cute golden retriever puppy playing in a field of colorful spring flowers, joyful, bright",
  "A magical treehouse glowing with warm fairy lights in a peaceful midnight forest",
  "A friendly robot offering a glowing flower to a curious child, illustration, watercolor style"
]

function App() {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // New States
  const [ratio, setRatio] = useState('square')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [negativePrompt, setNegativePrompt] = useState('blurry, deformed, ugly, bad anatomy, text, watermark, cartoon, illustration, anime, CGI')
  const [history, setHistory] = useState([])

  const hfToken = import.meta.env.VITE_HF_TOKEN

  useEffect(() => {
    // Session-based history handling
  }, [])

  const handleSurpriseMe = () => {
    const randomPrompt = SURPRISE_PROMPTS[Math.floor(Math.random() * SURPRISE_PROMPTS.length)]
    setPrompt(randomPrompt)
  }

  async function handleGenerate(e) {
    if (e) e.preventDefault()
    setError('')
    setStatus('')

    if (!prompt.trim()) {
      setError('Please provide a scene description.')
      return
    }

    setIsLoading(true)

    try {
      if (!hfToken) {
        throw new Error('API Configuration Missing. Check settings.')
      }

      // We remove the rigid photorealistic suffix so the user gets more organic/human feeling images
      const finalPrompt = prompt

      const activeRatio = ASPECT_RATIOS.find(r => r.id === ratio) || ASPECT_RATIOS[0]
      let finalImageUrl = ''

      // Use Hugging Face
      const response = await fetch('https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${hfToken}`,
        },
        body: JSON.stringify({
          inputs: finalPrompt,
          parameters: {
            negative_prompt: negativePrompt,
            width: activeRatio.width,
            height: activeRatio.height
          }
        }),
      })

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error("API Permission Denied. Check token scopes.")
        }
        throw new Error(`API Error: ${response.status}`)
      }

      const blob = await response.blob()
      finalImageUrl = URL.createObjectURL(blob)

      setImageUrl(finalImageUrl)
      setStatus('Your image is ready!')

      // Save to history
      setHistory(prev => [{
        id: Date.now(),
        url: finalImageUrl,
        prompt: finalPrompt
      }, ...prev])

    } catch (err) {
      console.error(err)
      const message = err instanceof Error && err.message ? err.message : 'Render failed. Validate connection.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadImage = () => {
    if (!imageUrl) return
    const a = document.createElement('a')
    a.href = imageUrl
    a.download = `render-${Date.now()}.png`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  const copyPrompt = () => {
    navigator.clipboard.writeText(prompt)
    setStatus('Prompt copied.')
    setTimeout(() => setStatus(''), 2000)
  }

  return (
    <div className="app-root">
      {/* Animated background blobs */}
      <div className="bg-blob bg-blob-1"></div>
      <div className="bg-blob bg-blob-2"></div>
      <div className="bg-blob bg-blob-3"></div>

      <header className="app-header">
        <h1>Dream Canvas</h1>
        <p>Bring your ideas to life instantly, with a touch of magic.</p>
      </header>

      <main className="app-main">
        <form className="generator-card" onSubmit={handleGenerate}>

          <div className="prompt-header">
            <label className="prompt-label" htmlFor="prompt" style={{ marginBottom: 0 }}>
              Scene Description
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                className="alt-btn"
                onClick={handleSurpriseMe}
                title="Load Preset Scene"
              >
                Random Scene
              </button>
            </div>
          </div>

          <textarea
            id="prompt"
            className="prompt-input"
            rows={5}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="What would you like to see? Describe the scene, colors, and mood..."
          />

          <div className="style-selector">
            <label className="section-label">Shape & Size</label>
            <div className="style-pills">
              {ASPECT_RATIOS.map(r => (
                <button
                  key={r.id}
                  type="button"
                  className={`style-pill ${ratio === r.id ? 'active' : ''}`}
                  onClick={() => setRatio(r.id)}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div className="advanced-toggle">
            <button
              type="button"
              className="advanced-btn"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              {showAdvanced ? 'Hide Advanced Parameters' : 'Show Advanced Parameters'}
            </button>
          </div>

          {showAdvanced && (
            <div className="advanced-panel">
              <label className="section-label">Negative Prompt</label>
              <textarea
                className="negative-prompt-input"
                rows={2}
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="blurry, bad anatomy, text, watermark"
              />
              <p className="helper-text">Anything you'd prefer to keep out of the image?</p>
            </div>
          )}

          <button className="generate-button" type="submit" disabled={isLoading}>
            {isLoading ? 'Creating Magic...' : 'Create Image'}
          </button>

          {status && <p className="status-message">{status}</p>}
          {error && <p className="error-message">{error}</p>}

          <div className="separator" />

          <h2 className="image-section-title">Your Masterpiece</h2>
          <div className="image-container">
            {isLoading && (
              <div className="image-loading-laser">
                <div className="loading-spinner"></div>
                <p>Drawing your idea...</p>
              </div>
            )}

            {imageUrl && !isLoading ? (
              <div className="image-wrapper">
                <img src={imageUrl} alt="Rendered Preview" className="generated-image" />
                <div className="image-overlay">
                  <button type="button" onClick={downloadImage} className="overlay-btn">Save Image</button>
                  <button type="button" onClick={copyPrompt} className="overlay-btn">Copy Prompt</button>
                </div>
              </div>
            ) : (!isLoading && (
              <div className="image-placeholder">Ready for input</div>
            ))}
          </div>
        </form>

        {history.length > 0 && (
          <section className="history-section">
            <h2 className="image-section-title">Session History</h2>
            <div className="history-grid">
              {history.map((item) => (
                <div key={item.id} className="history-card">
                  <img src={item.url} alt="History item" className="history-image" />
                  <p className="history-prompt">{item.prompt}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="app-footer">Made with ❤️ to spark your creativity.</footer>
    </div>
  )
}

export default App
