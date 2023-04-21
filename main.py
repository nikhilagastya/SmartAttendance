import cv2
import numpy as np
import face_recognition
import os
from datetime import datetime
from time import time
import pymongo
from pymongo import MongoClient

# from PIL import ImageGrab

path = 'Training_images'
images = []
classNames = []
myList = os.listdir(path)
print(myList)
for cl in myList:
    curImg = cv2.imread(f'{path}/{cl}')
    images.append(curImg)
    classNames.append(os.path.splitext(cl)[0])
print(classNames)


def findEncodings(images):
    encodeList = []


    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)
    return encodeList


nameList = []
name_storer={}
flag=1
def markAttendance(name):
    with open('Attendance.csv', 'r+') as f:
        myDataList = f.readlines()
        now =datetime.now()
        # print(name)
        for line in myDataList:
            # print(nameList)
            entry = line.split(',')
            if name not in nameList:
                name_storer[name]=[0,0]
                # now = datetime.now()
                name_storer[name][0]=time()
                # dtString = now.strftime('%H:%M:%S')
                # f.writelines(f'\n{name},{dtString}')
                nameList.append(name)
            else:
                # now=datetime.now()
                if time() - name_storer[name][0]>10:
                    name_storer[name][1]=time()
           
def insert_data():
            d=[]
            dic={}
            dd=datetime.now().date()
            for i,j in name_storer.items():
                if(j[1]-j[0]>=10):
                  d.append(i)
            dic["user_name"]=d
            dic["time"]=str(dd)
        #    cluster = MongoClient("mongodb+srv://artendance:qwerty123@cluster0.wzf1uqp.mongodb.net/Artendance?retryWrites=true&w=majority")
            cluster = MongoClient("mongodb+srv://artendance:Qwerty123@cluster0.lvtxm2j.mongodb.net/Artendance?retryWrites=true&w=majority")
            db = cluster["Artendance"]
            collection = db["students"]
#           post1 = {"_id":0, "user_name":"sa"}
# post2 = {"_id":"100", "user_name":"Ravi"}
        #    if(collection.find_one(name_storer)):
        #         collection.update_one(collection.find_one(name_storer),{"$set":name_storer})
        #    else:
            collection.insert_one(dic)
       



#### FOR CAPTURING SCREEN RATHER THAN WEBCAM
# def captureScreen(bbox=(300,300,690+300,530+300)):
#     capScr = np.array(ImageGrab.grab(bbox))
#     capScr = cv2.cvtColor(capScr, cv2.COLOR_RGB2BGR)
#     return capScr

encodeListKnown = findEncodings(images)
print('Encoding Complete')
print(nameList)

# cap = cv2.VideoCapture(1, cv2.CAP_DSHOW)
cap = cv2.VideoCapture(0)
# 'http://192.168.1.2:8080/video'
while True:
    success, img = cap.read()
# img = captureScreen()
    # imgS = cv2.resize(img, (0, 0), None, 0.5, 0.5)
    imgS = cv2.resize(img,(800,600))
    imgS = cv2.cvtColor(imgS, cv2.COLOR_BGR2RGB)
    # img= imgS = cv2.resize(img,(600,400))

    facesCurFrame = face_recognition.face_locations(imgS)
    encodesCurFrame = face_recognition.face_encodings(imgS, facesCurFrame)

    for encodeFace, faceLoc in zip(encodesCurFrame, facesCurFrame):
        matches = face_recognition.compare_faces(encodeListKnown, encodeFace)
        faceDis = face_recognition.face_distance(encodeListKnown, encodeFace)
# print(faceDis)
        matchIndex = np.argmin(faceDis)

        if matches[matchIndex]:
            name = classNames[matchIndex].upper()
# print(name)
            y1, x2, y2, x1 = faceLoc
            # y1, x2, y2, x1 = y1 * 4, x2 * 4, y2 * 4, x1 * 4
            # cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
            # cv2.rectangle(img, (x1, y2 - 35), (x2, y2), (0, 255, 0), cv2.FILLED)
            cv2.putText(img, name, (x1 + 6, y2 - 6), cv2.FONT_HERSHEY_COMPLEX, 1, (255, 255, 255), 2)
            markAttendance(name)
           
                
                

    cv2.imshow('Webcam', img)
    key = cv2.waitKey(1)
    if key ==ord('q'):
        break
cv2.destroyAllWindows()
cap.release() 
print(name_storer)
print()
insert_data()