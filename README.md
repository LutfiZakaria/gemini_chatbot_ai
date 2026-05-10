# Gemini Chatbot AI

A simple Express.js chatbot server powered by Google Gemini (gemini-2.5-flash). Responds in Indonesian by default.

## Requirements

- Node.js 18+
- A [Google Gemini API key](https://aistudio.google.com/apikey)

## Setup

```bash
npm install
```

Create a `.env` file:

```
GEMINI_API_KEY=your_api_key_here
PORT=3000
```

## Run

```bash
node index.js
```

Server starts on `http://localhost:3000`. The frontend is served from the `public/` folder.

## API

**POST** `/api/chat`

Request body:
```json
{
  "conversation": [
    { "role": "user", "text": "Halo!" },
    { "role": "model", "text": "Halo! Ada yang bisa saya bantu?" },
    { "role": "user", "text": "Siapa kamu?" }
  ]
}
```

Response:
```json
{
  "result": "Saya adalah asisten AI yang siap membantu Anda."
}
```

`conversation` must be an array. Pass the full chat history each request to maintain context.

## Stack

- [Express](https://expressjs.com/) — HTTP server
- [@google/genai](https://www.npmjs.com/package/@google/genai) — Gemini SDK
- [dotenv](https://www.npmjs.com/package/dotenv) — env config
