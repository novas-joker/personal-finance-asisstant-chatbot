# Personal Finance Assistant Chatbot

A web-based chatbot that assists users in managing personal finances, providing budgeting advice, investment guidance, and financial education.

## Features

- Interactive chat interface
- Personalized financial advice using Google's Gemini AI
- Budgeting recommendations
- Investment guidance
- Financial news and educational content

## Setup

1. Clone the repository
2. Create a virtual environment:
   ```
   py -m venv venv
   .\venv\Scripts\activate
   ```
3. Install dependencies:
   ```
   pip install flask google-generativeai requests python-dotenv
   ```
4. Create a `.env` file with your API keys:
   ```
   GEMINI_API_KEY=your_gemini_api_key
   ALPHA_VANTAGE_API_KEY=your_alpha_vantage_api_key
   NEWS_API_KEY=your_news_api_key
   ```
5. Run the application:
   ```
   python app.py
   ```
6. Open http://localhost:5000 in your browser

## Technology Stack

- Backend: Flask (Python)
- AI: Google Gemini API
- Financial Data: Alpha Vantage API
- News: News API
- Frontend: HTML, CSS, JavaScript, Bootstrap

## Project Structure

```
personal-finance-assistant-chatbot/
├── app/
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css
│   │   └── js/
│   │       └── chat.js
│   └── templates/
│       └── index.html
├── venv/
├── .env
├── app.py
└── README.md
``` 