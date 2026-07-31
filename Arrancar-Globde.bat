@echo off
start cmd /k "cd Backend && .\.venv\Scripts\python.exe -m uvicorn main:app --reload"
start cmd /k "npm run dev"