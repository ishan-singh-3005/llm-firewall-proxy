import os
import numpy as np
from transformers import AutoTokenizer, DistilBertForSequenceClassification
import torch
from sklearn.metrics import accuracy_score, f1_score
from prompt_dataset import PromptDataSet
from torch.utils.data import DataLoader

OUTPUT_DIR = os.getenv("OUTPUT_DIR", "data")

# Load saved model and tokenizer
model = DistilBertForSequenceClassification.from_pretrained("best_model")
tokenizer = AutoTokenizer.from_pretrained("best_model")

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
model.eval()


test_data = PromptDataSet(os.path.join(OUTPUT_DIR, "test_tokens.npz"))
test_dataloader = DataLoader(test_data, batch_size=64, shuffle=False, num_workers=8)

all_preds = []
all_labels = []

with torch.no_grad():
    for i, batch in enumerate(test_dataloader):
        batch = {k: v.to(device) for k, v in batch.items()}
        outputs = model(**batch)
        preds = torch.argmax(outputs.logits, dim=1)
        all_preds.extend(preds.cpu().numpy())
        all_labels.extend(batch["labels"].cpu().numpy())
        print(f"Completed batch {i}")

accuracy = accuracy_score(all_labels, all_preds)
f1 = f1_score(all_labels, all_preds)

print(f"Test Accuracy: {accuracy:.4f}")
print(f"Test F1 Score: {f1:.4f}")
