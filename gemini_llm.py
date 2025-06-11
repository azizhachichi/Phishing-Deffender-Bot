from langchain.llms.base import LLM
from typing import Optional, List
import google.generativeai as genai

class GeminiLLM(LLM):
    def __init__(self, model_name: str, api_key: str, **kwargs):
        super().__init__()
        self.model_name = model_name
        self.api_key = api_key
        self.model = genai.GenerativeModel(model_name)
        genai.configure(api_key=self.api_key)

    @property
    def _llm_type(self) -> str:
        return "gemini"

    def _call(self, prompt: str, stop: Optional[List[str]] = None) -> str:
        response = self.model.generate_content(prompt)
        return response.text