# Sara AI Chat

A simple browser-based chat interface with a server-side Gemini API endpoint. The API key stays on the server and should never be added to the browser files.

## Project structure

```text
.
├── index.html
├── styles.css
├── script.js
└── api/
    └── chat.js
```

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, create a new project and import the repository.
3. Set the **Root Directory** to `.` (the project root containing `index.html` and the `api` folder).
4. For this plain HTML project, leave the framework preset as **Other** and leave build and output settings at their defaults unless Vercel asks otherwise.
5. In the project settings, add an environment variable named `GEMINI_API_KEY` and set its value to your Gemini API key.
6. Deploy the project. If you add or change the key after deployment, redeploy so the function receives the updated value.
7. Open the deployed site and send a test message.

## Notes

- The browser sends chat messages to `/api/chat`; `api/chat.js` uses the server-side `GEMINI_API_KEY` to contact Gemini.
- Do not put the API key in `script.js`, `index.html`, or any other public file.
- Vercel hosting and Gemini API usage can have separate pricing, quotas, or billing requirements.
