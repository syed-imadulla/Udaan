import csv
import re


def load_csv(path: str) -> list[dict]:
    with open(path, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def clean_text(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()
