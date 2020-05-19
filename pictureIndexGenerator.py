''' This intention of this tool is:
to generate a list of images in the SlideShowPictures folder
and create a JSON Object within a js file
to be used by the main script.js to generate the HTML of the web page
'''

import os
import json

picturesJS = "SlideshowProject/PicturesJSON.js" # Target file.
slideShowPictures = "SlideshowProject/SlideShowPictures" # Folder of pictures

def generateArray(folder):
    '''
    Generates an array of file names from a given folder
    '''
    array = os.listdir(folder)
    return array

def arrayToDictionary(array):
    '''
    Generates a dictionary from an array of values
    '''
    dictionary = { x : array[x] for x in range(len(array))}
    return dictionary

def dictionaryToString(dictionary):
    '''
    Generates a String from a given Dictionary
    '''
    string = json.dumps(dictionary)
    return string

def objectToJSFile(dictString, targetFile):
    '''
    Writes the object to a js file
    '''
    file = open(targetFile, "w")
    file.write("picturesObject = [" + dictString + "]")
    file.close()

def generateJSFile_DEBUG( folder, targetFile ):
    '''
    Generates a .js file with 1 object so I can just reference the file in html and use it
    '''
    print("Folder: ",folder)
    print("Target File: ",targetFile)
    array = generateArray(folder)
    print("Array: ",array)
    dictionary = arrayToDictionary(array)
    print("Dict: ", dictionary)
    string = dictionaryToString(dictionary)
    print("String: ", string)
    objectToJSFile(string, targetFile)
    print("Created JSON File")

def run():
    generateJSFile_DEBUG( slideShowPictures,  picturesJS )
    input()

run()
