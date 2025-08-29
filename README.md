
# AI Firewall

This repository demonstrates a full-stack, production-grade AI safety and moderation system, combining advanced machine learning, robust backend engineering, and modern frontend development. It showcases a wide range of technical and product skills, from deep learning and data engineering to scalable API design and user-centric web interfaces.

## 🎬 Watch the Demo [![Demo Video](demo-thumbnail.png)](https://drive.google.com/file/d/1R4HDir3p2SQntvmyqpIAHTqspE7vft1N/view?usp=sharing)
**Securing Chatbots Against Prompt Injection (Demo Scenario):**
- Protect AI-powered chatbots on ecommerce or enterprise websites from prompt injection attacks that attempt to access unauthorized or sensitive customer data.
- As shown in the demo video, the AI Firewall can distinguish between secure and non-secure chat interfaces: only the secure chat window blocks malicious requests, preventing data leaks even when the underlying LLM has access to private databases.
- Enables safe integration of LLMs with business-critical systems by enforcing strict access controls at the prompt level.


## Business Use Cases


The AI Firewall is designed to address real-world business challenges related to AI safety, compliance, and responsible deployment. Here are some more business use cases:

- **Content Moderation for User-Generated Platforms:**
	- Automatically detect and block harmful, toxic, or policy-violating prompts in chatbots, forums, and social media platforms.
	- Protect brand reputation and ensure community guidelines are enforced at scale.

- **Enterprise Data Protection:**
	- Prevent sensitive or confidential information from being leaked through AI-powered assistants or customer support bots.
	- Enforce compliance with data privacy regulations (GDPR, HIPAA, etc.) by filtering prompts and responses.

- **AI Safety for Regulated Industries:**
	- Deploy in healthcare, finance, or legal sectors to ensure AI systems do not generate or act on unsafe, biased, or non-compliant content.
	- Provide audit trails and explainability for moderation decisions.

- **Responsible AI Deployment:**
	- Integrate with LLM APIs (OpenAI, HuggingFace, etc.) to add a safety layer before user input reaches the model.
	- Reduce risk of AI misuse and support responsible innovation.

- **Customizable Moderation for SaaS Providers:**
	- Offer moderation-as-a-service for SaaS platforms, enabling clients to tailor safety rules to their business needs.
	- Support multi-tenant deployments and role-based access control.

These use cases demonstrate the AI Firewall's value in protecting users, businesses, and society from the risks associated with generative AI, while enabling safe and scalable adoption of AI technologies.

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