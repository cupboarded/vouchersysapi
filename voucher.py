import datetime
import hashlib
import sys
import time
import mysql.connector

db = mysql.connector.connect(
    host = 'localhost',
    user = 'root',
    password = 'josephemmanuel1',
    database = 'ldxvouchersys'
)

def getArguments():
    return int(sys.argv[1]), sys.argv[2], int(sys.argv[3])

def getTimestamp():
    currTime = datetime.datetime.now()
    timestamp = f"{currTime.day}/{currTime.month}/{currTime.year} {currTime.hour}:{currTime.minute}:{currTime.second}"

    return timestamp

def connectDB():
    cur = db.cursor()

    return cur

def generateCode(eventName):
    timestamp = getTimestamp()

    payload = {"eventName": eventName, "timestamp": timestamp}
    hashedPayload = hashlib.sha256(str(payload).encode()).hexdigest()
    code = "ldx" + hashedPayload[:7]

    return code

def insertToDB(cursor, code, vouchVal):
    insertStatement = "INSERT INTO Vouchers VALUES (%s, %s, %s)"
    values = (code, vouchVal, 0)
    cursor.execute(insertStatement, values)

    db.commit()

def createCodes():
    cursor = connectDB()

    numCodes, eventName, vouchVal = getArguments()

    for i in range(0, numCodes):
        code = generateCode(eventName)

        time.sleep(1)

        insertToDB(cursor, code, vouchVal)

def main():
    argc = len(sys.argv)
    if argc < 4 or argc > 4:
        print('Usage: python3 voucher.py numCodes "eventName" voucherValues')
        exit()

    createCodes()

main()