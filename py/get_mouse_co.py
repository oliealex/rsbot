import sys
import json
import time

from pynput.mouse import Listener

clickStart = 0
nextClick = 0

PATH = "./misc/"
TMP = "coordinates_template.json"
bot_name = sys.argv[1]
output = "{}.json".format(bot_name)
data = {}


f = open(("").join(PATH + TMP))
data = json.load(f)
data['bot'] = bot_name
f.close()

def on_click(x, y, button, pressed):
    global clickStart
    global nextClick
    
    if pressed and str(button) != "Button.middle":
        nextClick = time.time() - clickStart
        clickStart = time.time()

        print("X: {}, Y: {}, button: {}".format(x,y,button))
        data["mouseMovements"].append({
            "x": x,
            "y": y,
            "button": str(button),
            "waitTime": 0 if nextClick > 500 else str(round(nextClick,1))
        })

    if str(button) == "Button.middle":
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
    print(data)

    with open(PATH + output, 'w') as outfile:
        json.dump(data, outfile)


if __name__ == "__main__":
    main()