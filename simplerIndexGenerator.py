import os
import json

targetFile = "PicturesJSON.js"
pictures  = "SlideShowPictures"

array = os.listdir(pictures) # array of picture files
dictionary = json.dumps({x:array[x] for x in range(len(array))}) # a faux JSON object of the array


file = open(targetFile, "w") # open target file
file.write("pictures = [" + dictionary + "]") # write object to file
file.close # close file

''' This does everything that the other python script does, but in a quarter of the lines. '''
