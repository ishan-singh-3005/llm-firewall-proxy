import os
import json
import numpy as np
import torch
from torch.utils.data import DataLoader
from torch.optim import AdamW
from torch.nn import CrossEntropyLoss
from transformers import AutoTokenizer, DistilBertForSequenceClassification
from sklearn.metrics import accuracy_score, f1_score
from dotenv import load_dotenv
from prompt_dataset import PromptDataSet

load_dotenv()

OUTPUT_DIR = os.getenv("OUTPUT_DIR", "data")
MODEL_NAME = os.getenv("MODEL_NAME", "distilbert-base-uncased")
NUM_EPOCHS = int(os.getenv("NUM_EPOCHS", 3))

train_data = PromptDataSet(os.path.join(OUTPUT_DIR, "train_tokens.npz"))
val_data = PromptDataSet(os.path.join(OUTPUT_DIR, "val_tokens.npz"))

train_dataloader = DataLoader(train_data, batch_size=64, shuffle=True, num_workers=8)
val_dataloader = DataLoader(val_data, batch_size=64, shuffle=True, num_workers=8)

print(f"DataLoaders created: Train={len(train_dataloader)}, Val={len(val_dataloader)}")    

tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = DistilBertForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=2)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using {device}")
model.to(device)

optimizer = AdamW(model.parameters(), lr=2e-5)

# setup loss function. read from class_weights.json and use cross entropyloss
with open(OUTPUT_DIR + "/class_weights.json") as f:
    class_weights = json.load(f)

loss_fn = CrossEntropyLoss(weight=torch.tensor([class_weights["0"], class_weights["1"]], dtype=torch.float)).to(device)

print("Starting model training")
best_f1 = 0.0

for epoch in range(NUM_EPOCHS):
    train_loss = 0
    for i, batch in enumerate(train_dataloader):
        batch = {k: v.to(device) for k, v in batch.items()}
        outputs = model(**batch)
        loss = loss_fn(outputs.logits, batch["labels"])
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()
        train_loss += loss.item()
        print(f"Batch: {i}")
    print(f"Epoch {epoch+1} | Train Loss: {train_loss/len(train_dataloader):.4f}")
    model.eval()
    val_loss = 0
    all_preds = []
    all_labels = []

    with torch.no_grad():
        for batch in val_dataloader:
            batch = {k: v.to(device) for k, v in batch.items()}
            outputs = model(**batch)
            loss = loss_fn(outputs.logits, batch["labels"])
            val_loss += loss.item()

            preds = torch.argmax(outputs.logits, dim=1)
            all_preds.extend(preds.cpu().numpy())
            all_labels.extend(batch["labels"].cpu().numpy())

    accuracy = accuracy_score(all_labels, all_preds)
    f1 = f1_score(all_labels, all_preds)
    print(f"Val Loss: {val_loss/len(val_dataloader):.4f}, Accuracy: {accuracy:.4f}, F1: {f1:.4f}")
    if f1 > best_f1:
        best_f1 = f1
        model.save_pretrained("best_model")
        tokenizer.save_pretrained("best_model")
    model.train()
