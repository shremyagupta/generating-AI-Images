# AI Image Generator

A React.js application that generates images from text descriptions using AI image generation APIs.

## Features

- 🎨 **Text-to-Image Generation**: Transform text descriptions into stunning images
- 🎯 **Modern UI**: Beautiful, responsive design with glassmorphism effects
- ⚡ **Fast & Responsive**: Optimized for performance and mobile devices
- 🔧 **Multiple API Support**: Compatible with OpenAI DALL-E, Hugging Face, and other APIs
- 🛡️ **Error Handling**: Robust error handling and user feedback

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- An AI image generation API key (optional for demo)

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd ai-image-generator
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. (Optional) Set up environment variables:
   Create a `.env` file in the root directory and add your API keys:
   ```
   REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
   REACT_APP_HUGGING_FACE_TOKEN=your_hugging_face_token_here
   ```

5. Start the development server:
   ```bash
   npm start
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Configuration

### OpenAI DALL-E

1. Get an API key from [OpenAI](https://platform.openai.com/api-keys)
2. Add it to your `.env` file as `REACT_APP_OPENAI_API_KEY`

### Hugging Face

1. Get a token from [Hugging Face](https://huggingface.co/settings/tokens)
2. Add it to your `.env` file as `REACT_APP_HUGGING_FACE_TOKEN`

### Demo Mode

If no API keys are provided, the app will run in demo mode with placeholder images.

## Project Structure

```
src/
├── components/
│   ├── Header.js          # App header with title
│   ├── Footer.js          # App footer
│   └── ImageGenerator.js  # Main image generation component
├── services/
│   └── imageService.js    # API integration service
├── App.js                 # Main app component
├── index.js              # React entry point
└── index.css             # Global styles
```

## Usage

1. Enter a detailed description of the image you want to generate
2. Click "Generate Image" or press Ctrl+Enter
3. Wait for the AI to generate your image
4. View and enjoy your created image!

## Example Prompts

- "A beautiful sunset over a mountain lake with purple clouds, digital art style"
- "A cute cartoon cat wearing a wizard hat, sitting on a pile of books"
- "A futuristic city with flying cars and neon lights, cyberpunk style"
- "A peaceful garden with cherry blossoms and a small pond, watercolor painting"

## Technologies Used

- **React.js** - Frontend framework
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client for API requests
- **AI APIs** - OpenAI DALL-E, Hugging Face, etc.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please create an issue in the repository.

---

Made with ❤️ using React.js and AI technology
