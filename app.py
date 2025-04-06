from flask import Flask, render_template, request, jsonify
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__, template_folder='app/templates', static_folder='app/static')

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Use the latest generative model
# gemini-1.5-pro is the latest model for balanced performance and cost
# If this doesn't work, we can fall back to gemini-1.0-pro or gemini-pro
try:
    model = genai.GenerativeModel('gemini-1.5-pro')
except Exception:
    try:
        model = genai.GenerativeModel('gemini-1.0-pro')
    except Exception:
        model = genai.GenerativeModel('gemini-pro')

@app.route('/')
def index():
    """Render the main chat interface"""
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    """Process chat messages and get responses from Gemini"""
    data = request.get_json()
    user_message = data.get('message', '')
    
    if not user_message:
        return jsonify({"error": "No message provided"}), 400
    
    # Add financial context to the prompt
    prompt = f"""As a personal finance assistant, help the user with the following query: 
    {user_message}
    
    Focus on providing practical financial advice, budgeting tips, or investment guidance as appropriate.
    """
    
    try:
        # Generate response using Gemini
        response = model.generate_content(prompt)
        
        # Handle different response formats based on the API version
        if hasattr(response, 'text'):
            response_text = response.text
        elif hasattr(response, 'parts'):
            response_text = ''.join(part.text for part in response.parts)
        else:
            response_text = str(response)
            
        return jsonify({"response": response_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True) 