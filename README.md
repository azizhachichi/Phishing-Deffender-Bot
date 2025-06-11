 Phishing Defender Bot:

Un chatbot intelligent spécialisé dans la cybersécurité, capable d'expliquer et de prévenir les attaques de type **phishing**. Ce projet combine **FastAPI** pour le backend, **React.js** pour le frontend et **Gemini 1.5 Flash** comme LLM.



 Fonctionnalités

- Répond aux questions sur la cybersécurité
- Détecte les intentions suspectes (ex : attaques de phishing)
- Interface moderne, responsive et colorée
- Déploiement simple en local

---

 Technologies utilisées

| Backend               | Frontend       | IA                                          

| FastAPI + Pydantic    | React + Axios  | Gemini 1.5 Flash (via `google.generativeai`) |

---

 Installation
 
 Backend (FastAPI)

```bash
cd backend
python -m venv env
source env/bin/activate  # ou `env\Scripts\activate` sous Windows
pip install -r requirements.txt
cp .env.example .env  # ajoute ta clé API Gemini dans ce fichier
uvicorn main:app --reload
