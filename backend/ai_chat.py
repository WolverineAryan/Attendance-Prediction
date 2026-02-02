from flask import Blueprint, request, jsonify
from langchain_community.llms import Ollama
from langchain_community.document_loaders import CSVLoader, PyPDFLoader
from langchain_community.vectorstores import Chroma
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OllamaEmbeddings
import os

ai = Blueprint("ai", __name__)

VECTOR_DB = "vector_db"

@ai.route("/ai/upload", methods=["POST"])
def upload_file():
    file = request.files["file"]
    path = f"uploads/{file.filename}"
    file.save(path)

    if file.filename.endswith(".csv"):
        loader = CSVLoader(path)
    else:
        loader = PyPDFLoader(path)

    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=100
    )
    chunks = splitter.split_documents(docs)

    db = Chroma.from_documents(
        chunks,
        OllamaEmbeddings(model="llama3"),
        persist_directory=VECTOR_DB
    )

    db.persist()
    return jsonify({"status": "File indexed successfully"})

@ai.route("/ai/chat", methods=["POST"])
def chat():
    question = request.json["question"]

    db = Chroma(
        persist_directory=VECTOR_DB,
        embedding_function=OllamaEmbeddings(model="llama3")
    )

    docs = db.similarity_search(question, k=3)

    context = "\n".join([d.page_content for d in docs])

    llm = Ollama(model="llama3")

    answer = llm(
        f"Answer ONLY using this data:\n{context}\n\nQuestion: {question}"
    )

    return jsonify({"answer": answer})
