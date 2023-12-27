import json

cards = {
    "A": "指定一人喝酒",
    "2": "小姐牌",
    "3": "逛三园",
    "4": "PK牌",
    "5": "照相机",
    "6": "摸鼻子",
    "7": "逢7必过",
    "8": "定规则",
    "9": "自己喝",
    "10": "神经病",
    "J": "左边喝",
    "Q": "右边喝",
    "K": "定酒"
}

cards_count = {
    "A": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
    "10": 0,
    "J": 0,
    "Q": 0,
    "K": 0,
}

with open('cards.json', 'w') as cards_dict:
    json.dump(cards, cards_dict)

with open('cards_count.json', 'w') as cards_count_dict:
    json.dump(cards_count, cards_count_dict)






