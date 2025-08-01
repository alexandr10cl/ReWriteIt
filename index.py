from flask import Flask, request, Response
from dotenv import load_dotenv
from google import genai
import os
from flask_cors import CORS

# Carrega variáveis do .env
load_dotenv()

app = Flask(__name__)

CORS(app)

@app.route('/rewrite', methods=['POST'])
def rewrite():
    original_text = request.form.get('text')
    mode = request.form.get('mode')

    client = genai.Client()

    if mode == "formal":
        gemini_question = (
            "Reescreva o texto a seguir de forma mais formal. Corrija qualquer erro de português, incluindo pontuação, concordância e erros de digitação. "
            "Mantenha o sentido original do texto. Retorne apenas o texto corrigido, sem dizer mais nada. Texto: " + original_text
        )
    else:
        gemini_question = (
            "Corrija qualquer erro de português do texto a seguir, incluindo pontuação, concordância e erros de digitação. "
            "Mantenha o sentido e o tom original do texto. Retorne apenas o texto corrigido, sem dizer mais nada. Texto: " + original_text
        )

    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=gemini_question
    )

    return Response(response.text, mimetype="text/plain")

if __name__ == "__main__":
    app.run(debug=False)
