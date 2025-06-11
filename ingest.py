from langchain.document_loaders import TextLoader, PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Chroma
from langchain.embeddings import OllamaEmbeddings
import os

# 📁 Dossier contenant tes fichiers
DATA_DIR = "data"

# 🔄 Charger tous les fichiers (PDF ou TXT)
documents = []

for filename in os.listdir(DATA_DIR):
    filepath = os.path.join(DATA_DIR, filename)
    
    if filename.endswith(".pdf"):
        loader = PyPDFLoader(filepath)
    elif filename.endswith(".txt"):
        loader = TextLoader(filepath)
    else:
        continue  # Ignorer les autres formats
    
    docs = loader.load()
    documents.extend(docs)

# ✂️ Split des documents
text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
docs_split = text_splitter.split_documents(documents)

# 🔢 Embedding avec Ollama
embedding = OllamaEmbeddings(model="nomic-embed-text")
 # tu peux tester llama3, gemma, etc.

# 💾 Création de la base vectorielle
Chroma.from_documents(documents=docs_split, embedding=embedding, persist_directory="vectorstore")

print("✅ Ingestion terminée avec succès.")