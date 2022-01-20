import sys
import json
import time

from os import path
from pynput.mouse import Listener as MouseListener
from pynput.keyboard import Listener as KeyboardListener

clickStart = 0
nextClick = 0

PATH = "./misc/"
data = []

# Read input arg
if len(sys.argv) > 1:
    bot_name = sys.argv[1]
    output = "{}.json".format(bot_name)
else:
    bot_name = ""

def appendNewData(filename):
    
    # Read JSON file
    with open(filename) as fp:
        listObj = json.load(fp)
 
    # Verify existing list
    print(listObj)
    print(type(listObj))
    

    ## Verify updated list
    print(listObj)

     
    #with open(filename, 'w') as json_file:
    #    json.dump(listObj, json_file, 
    #                    indent=4,  
    #                    separators=(',',': '))
 
    print('Successfully appended to the JSON file')

def on_click(x, y, button, pressed):
    global clickStart
    global nextClick
    button = str(button)

    if pressed and button != "Button.middle":
        nextClick = time.time() - clickStart
        clickStart = time.time()

        if button == "Button.left":
            button = ""
        else:
            button = button.split('.')[-1]

        print("X: {}, Y: {}, button: {}".format(x,y,button))
        data.append({
            "x": x,
            "y": y,
            "mouseButton": button,
            "button": "",
            "waitTime": 0 if nextClick > 500 else str(round(nextClick,1))
        })
    
    if button == "Button.middle":
        return False

#def on_press(key):
#    global clickStart
#    global nextClick
#    keyPressed = str(key).split('.')[-1]
#    nextClick = time.time() - clickStart
#    clickStart = time.time()
#    
#    print("KEY: " + keyPressed.replace("'",""))
#    data.append({
#        "x": 0,
#        "y": 0,
#        "mouseButton": "",
#        "button": keyPressed.replace("'",""),
#        "waitTime": 0 if nextClick > 500 else str(round(nextClick,1))
#    })
#
#    if(keyPressed == "esc"):
#        return False

def startListener():
    with MouseListener(on_click=on_click) as listener:
        listener.join()


def main():
    for i in range(3,0, -1):
        print("Mouse recorder starting in: " + str(i))
        time.sleep(1)

    startListener()
    
    print("\n###### Data Collected #######\n")
    print(data)

    # Check if file exists
    if path.isfile(PATH+output) is False:
        results = {"movement": []}
        results["movement"].append(data)
        with open(PATH + output, 'w') as outfile:
            json.dump(results,outfile)
    else:
        if len(sys.argv) > 0:
            appendNewData(output)


if __name__ == "__main__":
    main()