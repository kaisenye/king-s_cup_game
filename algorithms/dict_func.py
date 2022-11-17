import tkinter as tk
from tkinter import ttk

# get dic key from value function:
def get_key(val, dic):
    for key, value in dic.items():
        if val == value:
            return key

    return "key doesn't exist"
    