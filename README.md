
# Synapse AI Guard & AI Firewall

This repository demonstrates a full-stack, production-grade AI safety and moderation system, combining advanced machine learning, robust backend engineering, and modern frontend development. It showcases a wide range of technical and product skills, from deep learning and data engineering to scalable API design and user-centric web interfaces.

<details>
<summary><b>🎬 Watch the Demo</b></summary>

<p align="center">
	<video src="demo.mp4" controls width="600"></video>
</p>

</details>

## Repository Overview

- **ai-firewall/**: Python backend for harmful prompt detection, model training, and API serving (FastAPI, PyTorch, HuggingFace, OpenAI integration).
- **frontend/**: Modern React/TypeScript web app (Vite, shadcn-ui, Tailwind CSS) for interactive demo and user experience.
- **demo.mp4**: Video demonstration of the system in action.

## Skills & Technologies Showcased

### Machine Learning Pipeline (End-to-End)
- **Full ML pipeline ownership:** Designed and implemented the entire machine learning workflow, from raw data ingestion to live model deployment and monitoring.
- **Data engineering:** Automated dataset download, cleaning, stratified splitting, and class balancing using pandas and scikit-learn, ensuring robust and unbiased training data.
- **Feature engineering & tokenization:** Leveraged HuggingFace Transformers for advanced text preprocessing and tokenization at scale.
- **Custom PyTorch data loaders:** Built efficient, scalable PyTorch Dataset and DataLoader classes for handling large tokenized datasets.
- **Model development:** Fine-tuned transformer models (DistilBERT) for binary text classification, optimizing for both accuracy and generalization.
- **Training pipeline:** Implemented reproducible training loops with dynamic class weighting, validation, and early stopping.
- **Evaluation & metrics:** Automated model evaluation with accuracy, F1, and confusion matrix reporting on validation and test splits.
- **Model packaging:** Saved and versioned best-performing models and tokenizers for seamless deployment.
- **API deployment:** Served models via FastAPI for real-time inference, with robust request validation and error handling.
- **Monitoring & extensibility:** Designed for easy integration of logging, monitoring, and future model updates.

### Backend Engineering
- FastAPI-based REST API with CORS, request validation (Pydantic), and OpenAI integration.
- Secure environment variable management and configuration (dotenv).
- Modular, maintainable code structure for extensibility and clarity.
- Logging, error handling, and production-readiness best practices.

### DevOps & Product
- Reproducible environments with requirements.txt and package.json.
- Clear documentation and onboarding (multiple READMEs, quick start guides).
- Demo video and interactive showcase for stakeholders.
- End-to-end product thinking: from dataset to user experience.

## How to Run

See `ai-firewall/README.md` and `frontend/README.md` for detailed setup and usage instructions for each part.

---
**Author:** Ishan Singh  ==


## TODO / Planned Improvements

- **Authentication & Authorization:**
	- Add user authentication (JWT or OAuth) to protect API endpoints and user data.
	- Implement role-based access control for admin and user features.
- **Rate Limiting & Abuse Prevention:**
	- Integrate rate limiting to prevent API abuse and brute-force attacks.
	- Add IP-based throttling and monitoring for suspicious activity.
- **Security Enhancements:**
	- Enforce HTTPS and secure CORS policies in production.
	- Add input sanitization and validation throughout the stack.
- **Scalability:**
	- Containerize services with Docker for easier deployment.
	- Add support for distributed inference and horizontal scaling.
- **Model Improvements:**
	- Experiment with larger or more robust transformer models.
	- Add support for multi-label or multi-class classification.
	- Enable online learning or model updates without downtime.