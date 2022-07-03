import random


dic = {
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

count = {
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
    "K": 0
}


# get dic key from value function:
def get_key(val):
    for key, value in dic.items():
         if val == value:
             return key
 
    return "key doesn't exist"




# main loop
card_empty = False

while not card_empty:

  # get random card
  random_card = random.choice(list(dic.values()))
  # output random card
  print(get_key(random_card), " - ", random_card)
  print(count)

  # increment count for random_card
  count[get_key(random_card)] = count[get_key(random_card)] + 1

  # delete empty cards
  if count[get_key(random_card)] == 4:
    del count[get_key(random_card)]
    del dic[(get_key(random_card))]


  # check if the cards are all draw
  if len(count) == 0:
    card_empty = True
    game_over_message = "Game Over!"
    print (game_over_message)
    break

  # get user_input
  user_input = input("If contine, prese ENTER")
  if user_input == "": continue
