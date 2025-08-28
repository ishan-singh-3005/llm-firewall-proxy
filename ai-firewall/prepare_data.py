import os
import json
import numpy as np
import pandas as pd
from datasets import load_dataset
from sklearn.model_selection import train_test_split
from sklearn.utils.class_weight import compute_class_weight
from transformers import AutoTokenizer
from huggingface_hub import login
from dotenv import load_dotenv

login()

load_dotenv()

MODEL_NAME = os.getenv("MODEL_NAME", "distilbert-base-uncased")
MAX_LEN = int(os.getenv("MAX_LEN", 512))
VAL_SIZE = float(os.getenv("VAL_SIZE", 0.1))
OUTPUT_DIR = os.getenv("OUTPUT_DIR", "data")
os.makedirs(OUTPUT_DIR, exist_ok=True)

print("Loading WildGuardMix dataset...")
train_ds = load_dataset("allenai/wildguardmix", "wildguardtrain")["train"]
test_ds = load_dataset("allenai/wildguardmix", "wildguardtest")["test"]

print(f"Train set size: {len(train_ds)}, Test set size: {len(test_ds)}")

def filter_missing(ds):
    return [x for x in ds if x["prompt_harm_label"] is not None]

train_data = filter_missing(train_ds)
test_data = filter_missing(test_ds)

print(f"After filtering: Train={len(train_data)}, Test={len(test_data)}")

train_df = pd.DataFrame(train_data)
test_df = pd.DataFrame(test_data)

# Encode labels
label_map = {"harmful": 1, "unharmful": 0}
train_df["label"] = train_df["prompt_harm_label"].map(label_map)
test_df["label"] = test_df["prompt_harm_label"].map(label_map)

train_split, val_split = train_test_split(
    train_df, 
    test_size=VAL_SIZE, 
    stratify=train_df["label"], 
    random_state=42
)

print("Label distribution after splitting:")
print("Train", train_df["label"].value_counts(normalize=True))
print("Val", val_split["label"].value_counts(normalize=True))

print(f"Train={len(train_split)}, Val={len(val_split)}, Test={len(test_df)}")

class_weights = compute_class_weight(
    class_weight="balanced",
    classes=np.unique(train_split["label"]),
    y=train_split["label"]
)

class_weights = dict(zip(np.unique(train_split["label"]), class_weights))
print("Class Weights:", class_weights)

class_weights_clean = {
    int(k): float(v) for k, v in class_weights.items()
}

print("Class Weights Clean:", class_weights_clean)

with open(os.path.join(OUTPUT_DIR, "class_weights.json"), "w") as f:
    json.dump(class_weights_clean, f)

print("Tokenizing...")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

def tokenize_texts(df, split_name):
    encodings = tokenizer(
        df["prompt"].tolist(),
        truncation=True,
        padding="max_length",
        max_length=MAX_LEN,
        return_tensors="np"
    )
    np.savez(
        os.path.join(OUTPUT_DIR, f"{split_name}_tokens.npz"),
        input_ids=encodings["input_ids"],
        attention_mask=encodings["attention_mask"],
        labels=df["label"].values
    )
    df.to_csv(os.path.join(OUTPUT_DIR, f"{split_name}_raw.csv"), index=False)

tokenize_texts(train_split, "train")
tokenize_texts(val_split, "val")
tokenize_texts(test_df, "test")

print("✅ Data prep complete. Files saved in", OUTPUT_DIR)
