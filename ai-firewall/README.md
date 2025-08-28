# AI Firewall

This folder contains the core code and resources for the **AI Firewall** project, a system designed to detect and filter harmful prompts using a fine-tuned DistilBERT model. The AI Firewall can be used as a FastAPI service or as a standalone classifier for research and production.

## Contents

- `main.py`: FastAPI app for serving the AI Firewall as an API, including CORS, OpenAI integration, and customer data examples.
- `local_run.py`: Script for running prompt classification from the command line.
- `prepare_data.py`: Prepares and processes the WildGuardMix dataset, splits data, computes class weights, and saves tokenized data for training.
- `prompt_dataset.py`: PyTorch Dataset class for loading tokenized prompt data from `.npz` files.
- `train.py`: Trains a DistilBERT model for harmful/unharmful prompt classification, using class weights and validation.
- `test.py`: Evaluates the trained model on the test set and prints accuracy and F1 score.
- `requirements.txt`: Python dependencies for the AI Firewall (FastAPI, transformers, torch, scikit-learn, etc.).
- `best_model/`: Directory containing the best trained model and tokenizer files.
- `data/`: Contains processed data, class weights, and tokenized datasets for training, validation, and testing.

## Quick Start

1. **Install dependencies**
   ```sh
   pip install -r requirements.txt
   ```

2. **Prepare data**
   ```sh
   python prepare_data.py
   ```

3. **Train the model**
   ```sh
   python train.py
   ```

4. **Test the model**
   ```sh
   python test.py
   ```

5. **Run the API server**
   ```sh
   uvicorn main:app --reload
   ```

6. **Classify prompts interactively**
   ```sh
   python local_run.py
   ```

## Data
- Uses the [WildGuardMix](https://huggingface.co/datasets/allenai/wildguardmix) dataset for harmful/unharmful prompt classification.
- Data is split into train, validation, and test sets, with class weights computed for balanced training.

## Model
- Fine-tunes `distilbert-base-uncased` for binary classification.
- Model and tokenizer are saved in `best_model/` after training.

## API
- The FastAPI app exposes endpoints for prompt classification and can be extended for integration with other systems.

## Environment Variables
- Configure model, data, and training parameters via a `.env` file (see code for defaults).

## License
This project is for research and demonstration purposes. See the main repository for license details.
