import tkinter as tk
from tkinter import filedialog


def dialog(file_dict):
    root = tk.Tk()
    root.withdraw()
    root.deiconify()

    file_path = filedialog.askopenfilename(filetypes=[(file_dict[0], file_dict[1])])

    root.quit()
    root.destroy()
    return file_path if file_path else None

