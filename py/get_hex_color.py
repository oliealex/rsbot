import sys
import json
import time
from os import path

from PIL import Image, ImageGrab
from pynput.mouse import Listener

data = []
if len(sys.argv) > 1:
    model = sys.argv[1]
x_screen, y_screen = 0, 0

def appendNewData(filename):
    
    # Check if file exists
    if path.isfile(filename) is False:
        raise Exception("File not found")
 
    # Read JSON file
    with open(filename) as fp:
        listObj = json.load(fp)
 
    # Verify existing list
    print(listObj)
    print(type(listObj))
    
    listObj[model] = { "colors": data, "X": x_screen, "Y": y_screen }
    listObj[model]["colors"] = list(dict.fromkeys(listObj[model]["colors"]))
    ## Verify updated list
    print(listObj)

     
    with open(filename, 'w') as json_file:
        json.dump(listObj, json_file, 
                        indent=4,  
                        separators=(',',': '))
 
    print('Successfully appended to the JSON file')

def on_click(x, y, button, pressed):
    button = str(button)
    global x_screen
    global y_screen

    if pressed and button != "Button.middle":
        image = ImageGrab.grab()
        color = image.getpixel((x,y))
        color = '%02x%02x%02x' % color
        data.append(color)
        x_screen = x
        y_screen = y
        print("COLOR: {}, X: {}, Y: {}".format(color,x,y))

    if button == "Button.middle":
        print("Stopped recording")
        return False        

def startListener():
    with Listener(on_click=on_click) as listener:
        listener.join()


def main():


    for i in range(3,0, -1):
        print("Mouse recorder starting in: " + str(i))
        time.sleep(1)

    startListener()
    print("\n###### Data Collected #######\n")
    
    if len(sys.argv) > 0:
        appendNewData("./data/color_models.json")


if __name__ == "__main__":
    main()