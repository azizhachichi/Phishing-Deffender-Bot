from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Charger les variables d'environnement depuis un fichier .env
load_dotenv()

# Récupérer la clé API depuis les variables d'environnement
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Vérifier que la clé est bien fournie
if not GEMINI_API_KEY:
    raise ValueError("Clé API Gemini manquante. Assurez-vous que GEMINI_API_KEY est définie.")

# Configurer l'API Gemini
genai.configure(api_key=GEMINI_API_KEY)

# Créer une instance du modèle rapide
model = genai.GenerativeModel(model_name="gemini-1.5-flash")

# Initialiser l'application FastAPI
app = FastAPI()

# Activer CORS pour le frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # À restreindre en prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Schéma de requête
class ChatRequest(BaseModel):
    question: str

# Endpoint POST /chat
@app.post("/chat")
async def chat(req: ChatRequest):
    try:
        # Créer une session de chat (conversation)
        chat_session = model.start_chat(history=[])

        # Message système pour spécialisation phishing
        system_prompt = (
            "Tu es un expert en cybersécurité, spécialisé uniquement dans les attaques de phishing. "
            "Tu aides à comprendre, détecter, prévenir et analyser les attaques de phishing : email frauduleux, "
            "SMShing, usurpation d'identité, sites falsifiés, etc. "
            "Sois précis, utilise des exemples, explique de manière simple mais technique."
            "Ne réponds pas à des questions hors de ce domaine. "
            "Si la question n'est pas liée au phishing, réponds poliment que tu ne peux pas aider." 
           
        )

        # Envoyer le prompt système (orientation experte)
        chat_session.send_message(system_prompt)

        # Envoyer la question utilisateur
        response = chat_session.send_message(req.question)

        # Retourner la réponse
        return {"response": response.text}

    except Exception as e:
        return {"error": str(e)}
