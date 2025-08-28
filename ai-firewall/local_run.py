from transformers import AutoTokenizer, DistilBertForSequenceClassification
import torch

model = DistilBertForSequenceClassification.from_pretrained("best_model")
tokenizer = AutoTokenizer.from_pretrained("best_model")

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
model.eval()


def predict_prompt(prompt):
    inputs = tokenizer(prompt, return_tensors="pt", truncation=True, padding=True, max_length=512)
    inputs = {k: v.to(device) for k, v in inputs.items()}

    with torch.no_grad():
        outputs = model(**inputs)
    
    pred_label = torch.argmax(outputs.logits, dim=1).item()

    # label_map = {0: "Safe", 1: "Harmful"}
    return pred_label

text = input("Enter prompt to test (q to close): ")
while text != "q":
    result = predict_prompt(text)
    print(f"Prompt: {text}")
    print(f"Prediction: {result}")
    text = input("Enter prompt to test (q to close): ")
