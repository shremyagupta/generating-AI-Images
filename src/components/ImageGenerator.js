import React, { useState } from 'react';
import styled from 'styled-components';
import { generateImage } from '../services/imageService';

const GeneratorContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const InputSection = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

const TextInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const RealisticTips = styled.div`
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 1px solid #0284c7;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #0369a1;
`;

const TipsTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  color: #0369a1;
  font-size: 1rem;
`;

const TipsList = styled.ul`
  margin: 0;
  padding-left: 1.2rem;
  
  li {
    margin-bottom: 0.3rem;
  }
`;

const GenerateButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResultSection = styled.div`
  text-align: center;
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 2rem auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const GeneratedImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  margin-top: 1rem;
  transition: opacity 0.3s ease;
  
  &.loading {
    opacity: 0.5;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
`;

const ImageLoadingOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  border-radius: 8px;
  display: ${props => props.show ? 'block' : 'none'};
`;

const DownloadButton = styled.button`
  background: #10b981;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease;

  &:hover {
    background: #059669;
  }
`;

const ErrorMessage = styled.div`
  background: #fee;
  border: 1px solid #fcc;
  color: #c33;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
`;

const LoadingMessage = styled.div`
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border: 1px solid #f39c12;
  color: #d68910;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  text-align: center;
  font-weight: 500;
`;

const SuccessMessage = styled.div`
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  border: 1px solid #28a745;
  color: #155724;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  text-align: center;
  font-weight: 500;
`;

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a description for the image you want to generate.');
      return;
    }

    setIsLoading(true);
    setError('');
    setGeneratedImage(null);
    setImageLoading(false);
    setImageLoaded(false);

    try {
      const imageUrl = await generateImage(prompt);
      setGeneratedImage(imageUrl);
      setImageLoading(true); // Start loading the image
    } catch (err) {
      setError(err.message || 'Failed to generate image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageLoaded(false);
    setError('Failed to load the generated image. Please try again.');
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `ai-generated-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleGenerate();
    }
  };

  return (
    <GeneratorContainer>
      <InputSection>
        <Label htmlFor="prompt">Describe the image you want to generate:</Label>
        <TextInput
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., A golden retriever playing in a sunny park, realistic photography style"
          disabled={isLoading}
        />
        <RealisticTips>
          <TipsTitle>💡 Tips for Ultra-Realistic Images:</TipsTitle>
          <TipsList>
            <li>Be specific about details (lighting, environment, expressions)</li>
            <li>Add "photorealistic" or "professional photography" to your description</li>
            <li>Mention camera settings like "DSLR camera" or "studio lighting"</li>
            <li>Include texture details like "natural skin", "detailed fur", etc.</li>
          </TipsList>
        </RealisticTips>
      </InputSection>

      <GenerateButton
        onClick={handleGenerate}
        disabled={isLoading || !prompt.trim()}
      >
        {isLoading ? 'Generating...' : 'Generate Image'}
      </GenerateButton>

      <ResultSection>
        {isLoading && (
          <>
            <LoadingSpinner />
            <LoadingMessage>🎨 Generating your AI image...</LoadingMessage>
          </>
        )}
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        {generatedImage && !isLoading && (
          <>
            {imageLoading && (
              <>
                <LoadingSpinner />
                <LoadingMessage>📸 Loading your generated image...</LoadingMessage>
              </>
            )}
            
            {imageLoaded && !imageLoading && (
              <SuccessMessage>✅ Image generated and loaded successfully!</SuccessMessage>
            )}
            
            <ImageContainer>
              <GeneratedImage 
                src={generatedImage} 
                alt="Generated AI Image"
                className={imageLoading ? 'loading' : ''}
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{ display: imageLoading ? 'none' : 'block' }}
              />
              <ImageLoadingOverlay show={imageLoading}>
                <LoadingSpinner />
                <p>Loading image...</p>
              </ImageLoadingOverlay>
            </ImageContainer>
            
            {imageLoaded && !imageLoading && (
              <DownloadButton onClick={handleDownload}>
                📥 Download Image
              </DownloadButton>
            )}
          </>
        )}
      </ResultSection>
    </GeneratorContainer>
  );
};

export default ImageGenerator;
