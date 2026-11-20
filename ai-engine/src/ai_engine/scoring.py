def score_item(item: dict, weights: dict) -> float:
    """Weighted sum of the numeric fields named in weights."""
    return sum(float(item.get(k, 0)) * w for k, w in weights.items())
