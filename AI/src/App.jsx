import { useState } from 'react'

function App() {
  const [prompt, setPrompt] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY

  async function handleGenerate(e) {
    e.preventDefault()
    setError('')
    setStatus('')
    setImageUrl('')

    if (!prompt.trim()) {
      setError('Please enter a description first.')
      return
    }

    setIsLoading(true)

    try {
      if (!apiKey) {
        throw new Error('Missing OpenAI API key. Set VITE_OPENAI_API_KEY in AI/.env.')
      }

      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-image-1',
          prompt,
          size: '1024x1024',
        }),
      })

      if (!response.ok) {
        let errorMessage = `OpenAI error ${response.status}`

        try {
          const bodyText = await response.text()
          if (bodyText) {
            try {
              const parsed = JSON.parse(bodyText)
              if (parsed?.error?.message) {
                errorMessage = parsed.error.message
              } else {
                errorMessage = bodyText
              }
            } catch {
              errorMessage = bodyText
            }
          }
        } catch {
          // ignore body parse errors, keep default message
        }

        throw new Error(errorMessage)
      }

      const data = await response.json()
      const first = data?.data?.[0]

      if (!first) {
        throw new Error('No image returned from API.')
      }

      if (first.url) {
        setImageUrl(first.url)
      } else if (first.b64_json) {
        setImageUrl(`data:image/png;base64,${first.b64_json}`)
      } else {
        throw new Error('Unsupported image format in API response.')
      }

      setStatus('Image generated successfully!')
    } catch (err) {
      console.error(err)
      const message = err instanceof Error && err.message ? err.message : 'Failed to generate image. Please check your OpenAI API key and billing, then try again.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  function handleImageError() {
    setError('Failed to load the generated image. Please try again.')
    setImageUrl('')
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>AI Image Generator</h1>
        <p>Transform your imagination into stunning visuals</p>
      </header>

      <main className="app-main">
        <form className="generator-card" onSubmit={handleGenerate}>
          <label className="prompt-label" htmlFor="prompt">
            Describe the image you want to generate:
          </label>
          <textarea
            id="prompt"
            className="prompt-input"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="a girl reading a book in the library, photorealistic, soft lighting, DSLR, 4K"
          />

          <section className="tips-card">
            <h2>💡 Tips for Ultra-Realistic Images:</h2>
            <ul>
              <li>Be specific about details (lighting, environment, expressions).</li>
              <li>Add words like "photorealistic" or "professional photography".</li>
              <li>Mention camera settings like "DSLR camera" or "studio lighting".</li>
              <li>Include texture details like "natural skin" or "detailed fur".</li>
            </ul>
          </section>

          <button className="generate-button" type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Image'}
          </button>

          {status && <p className="status-message">{status}</p>}
          {error && <p className="error-message">{error}</p>}

          <div className="separator" />

          <h2 className="image-section-title">Generated AI Image</h2>
          {imageUrl ? (
            <img src={imageUrl} alt="Generated AI" onError={handleImageError} className="generated-image" />
          ) : (
            <div className="image-placeholder">Generated AI Image</div>
          )}
        </form>
      </main>

      <footer className="app-footer">© 2025 AI Image Generator. Powered by advanced AI technology.</footer>
    </div>
  )
}

export default App
