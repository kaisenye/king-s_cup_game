import random
import json
import sys
sys.path.append("/Users/kaisenye/GitHub/king-s_cup_game/kingsCupGame/algorithms")
from dict_func import get_key



# open json files/load dicts -----------------------------------------------------
with open('cards.json') as cards_dict:
    cards = json.load(cards_dict)
with open('cards_count.json') as cards_count_dict:
    cards_count = json.load(cards_count_dict)




# main loop ---------------------------------------------------------------------
card_empty = False

while not card_empty:

  # get random card and its key
  random_card = random.choice(list(cards.values()))
  card_key = get_key(random_card, cards)


  # output random card
  message = card_key + " - " + random_card
  print(message)
  print(cards_count)

  # increment count for random_card
  cards_count[card_key] = cards_count[card_key] + 1

  # delete empty cards
  if cards_count[card_key] == 4:
    del cards_count[card_key]
    del cards[(card_key)]


  # check if the cards are all drawed
  # if so, end the game
  if len(cards_count) == 0:
    print ("Game Over!")
    break

  # get user_input
  user_input = input("If contine, prese ENTER")
  if user_input == "": continue
