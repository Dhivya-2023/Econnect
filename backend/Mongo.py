from Csvhandler import addnewdata,Getcsvdataformat,Deletecsvdata,Updatecsvdata
from datetime import datetime, timedelta, date
from fastapi.exceptions import HTTPException
from fastapi import FastAPI, HTTPException
from auth.auth_handler import signJWT
from model import RemoteWorkRequest
from bson.objectid import ObjectId
from pymongo import MongoClient
from dateutil import parser
from bson import json_util
from bson import ObjectId
import bcrypt
import pytz 
import json

client = MongoClient("mongodb+srv://dhivya27:dhivya27@cluster0.i9tdnkx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
client=client.RBG_AI
Users=client.Users
Add=client.Dataset
Leave=client.Leave_Details
Clock=client.Attendance
RemoteWork = client.RemoteWork
admin = client.admin

# Others
def Adddata(data,id,filename):
    a=Add.insert_one({'userid':id,'data':data,'filename':filename})
    return str(a.inserted_id)

def Editdata(data,id,filename):
    a=Add.update_one({"_id":ObjectId(id)},{"$set":{"data":data,'filename':filename}})
    return "done"

def deletedata(id):
    a=Add.delete_one({'_id':ObjectId(id)})
    return "done"

def addcsv(name,data,id):
    old=Add.find_one({'user_id':id})
    if old:
        print(id)
        a=addnewdata(name,data,id)
        print(a)
        return 's'
    else:
        a=addnewdata(name,data,id)
        print(a)
        u=Add.insert_one({'user_id':id,'path':a,'filename':name})
        return str(u.inserted_id)

def Getcsvdata(id):
    res=Getcsvdataformat(f'./Csvdata/{id}.csv')
    return res

def Updatecsv(name,data,id,fileid):
    res=Updatecsvdata(id=id,data=data,fileid=fileid,name=name)
    return res

def Deletecsv(id,fileid):
    res=Deletecsvdata(fileid=fileid,id=id)
    return res

def Hashpassword(password):
    bytePwd = password.encode('utf-8')
    mySalt = bcrypt.gensalt()
    pwd_hash = bcrypt.hashpw(bytePwd, mySalt)
    return pwd_hash

def CheckPassword(password,pwd_hash):
    password = password.encode('utf-8')
    check=bcrypt.checkpw(password, pwd_hash)
    return check
    
def Signup(email,password,name):
    check_old_user=Users.find_one({'email':email})
    if check_old_user:
        raise HTTPException(status_code=300, detail="Email already Exists")
    else:
        Haspass=Hashpassword(password)
        a=Users.insert_one({'email':email,'password':Haspass,'name':name })
        return signJWT(email)

def cleanid(data):
    obid=data.get('_id')
    data.update({'id':str(obid)})
    del data['_id']
    return data
  
def signin(email,password):
    checkuser=Users.find_one({'email': email})
    if (checkuser):
        checkpass=CheckPassword(password,checkuser.get('password'))
        if (checkpass):
            a=signJWT(email)
            checkuser=cleanid(checkuser)
            checkuser.update(a)
            return checkuser
        else :
            raise HTTPException(status_code=300, detail="Given Password is Incorrect")
    else:
        raise HTTPException(status_code=300, detail="Given Email does not exists")

def admin_Signup(email,password,name):
    check_old_user=admin.find_one({'email':email})
    if check_old_user:
        raise HTTPException(status_code=300, detail="Email already Exists")
    else:
        Haspass=Hashpassword(password)
        a=admin.insert_one({'email':email,'password':Haspass,'name':name })
        return signJWT(email)
    
def admin_signin(email,password):
    checkuser=admin.find_one({'email': email})
    if (checkuser):
        checkpass=CheckPassword(password,checkuser.get('password'))
        if (checkpass):
            a=signJWT(email)
            checkuser=cleanid(checkuser)
            checkuser.update(a)
            return checkuser
        else :
            raise HTTPException(status_code=300, detail="Given Password is Incorrect")
    else:
        raise HTTPException(status_code=300, detail="Given Email does not exists")

# Google Signin      
def Gsignin(client_name,email):
    checkuser=Users.find_one({'email': email})
    
    if (checkuser):
            
            a=signJWT(client_name)
            checkuser=cleanid(checkuser)
            checkuser.update(a)
            return checkuser
       
    else:
        raise HTTPException(status_code=300, detail="Given Email does not exists")

# UserID
def Userbyid(id):
    user=Add.find({'userid':id})
    data=[]
    for i in user:
        data.append(cleanid(i))
    return data


# Admin ID
def adminbyid(id):
    user=Add.find({'userid':id})
    data=[]
    for i in user:
        data.append(cleanid(i))
    return data

# Admin Google Signin
def admin_Gsignin(client_name, email):
    checkuser = admin.find_one({'email': email})
    
    if (checkuser):
        a = signJWT(client_name)
        checkuser = cleanid(checkuser)
        checkuser.update(a)
        return checkuser
    else:
        raise HTTPException(status_code=404, detail="User not found")

# Time management

# def Clockin(userid, name, time):
#     today = date.today()
    
#     clockin_time = datetime.strptime(time, "%I:%M:%S %p")
#     status = "Present" if datetime.strptime("09:00:00 AM", "%I:%M:%S %p") <= clockin_time <= datetime.strptime("10:30:00 AM", "%I:%M:%S %p") else "Late"
#     existing_record = Clock.find_one({'date': str(today), 'name': name})
    
#     if not existing_record:
#         Clock.insert_one({
#             'userid': userid,
#             'date': str(today),
#             'name': name,
#             'clockin': time,
#             'status': status,
#             'remark': ''
#         })
#     else:
#         Clock.find_one_and_update(
#             {'date': str(today), 'name': name},
#             {'$set': {'clockin': time, 'status': status}}
#         )
#     return True

# def Clockin(userid, name, time):
    # today = date.today()
#     a = Clock.find_one({'date': str(today), 'name': name})
#     status = "Present" if "08:30" <= time <= "10:30" else "Late"
#     if not a:
#         Clock.insert_one({'userid': userid, 'date': str(today), 'name': name, 'clockin': time, 'status': status, 'remark': ''})
#     else:
#         Clock.find_one_and_update({'date': str(today), 'name': name}, {'$set': {'clockin': time, 'status': status}})
#     return True

def Clockin(userid, name, time):
    today = date.today()
    print(time)
    
    # Adjust the time format to "hh:mm:ss AM/PM"
    clockin_time = datetime.strptime(time, "%I:%M:%S %p")
    
    status = "Present" if datetime.strptime("08:30:00 AM", "%I:%M:%S %p") <= clockin_time <= datetime.strptime("10:30:00 AM", "%I:%M:%S %p") else "Late"
    
    existing_record = Clock.find_one({'date': str(today), 'name': name})
    
    if not existing_record:
        Clock.insert_one({
            'userid': userid,
            'date': str(today),
            'name': name,
            'clockin': time,
            'status': status,
            'remark': ''
        })
    else:
        Clock.find_one_and_update(
            {'date': str(today), 'name': name},
            {'$set': {'clockin': time, 'status': status}}
        )
    
    return True

# def Clockout(userid, name, time):
#     today = date.today()
#     a = Clock.find_one({'date': str(today), 'name': name})

#     if a:
#         clockin_time = parser.parse(a['clockin'])
#         clockout_time = parser.parse(time)

#         total_seconds_worked = (clockout_time - clockin_time).total_seconds()
#         total_hours_worked = total_seconds_worked / 3600
#         remaining_seconds = total_seconds_worked % 3600
#         total_minutes_worked = remaining_seconds // 60
#         remark = "N/A" if total_hours_worked >= 8 else "Incomplete"

#         Clock.find_one_and_update(
#             {'date': str(today), 'name': name},
#             {'$set': {'clockout': time, 'total_hours_worked': f'{int(total_hours_worked)} hours {int(total_minutes_worked)} minutes', 'remark': remark}}
#         )

#         return f'{int(total_hours_worked)} hours {int(total_minutes_worked)} minutes', remark
#     else:
#         a = Clock.insert_one({'userid': userid, 'date': str(today), 'name': name, 'clockout': time})
#         return a, None, None
def parse_time_string(time_str):
    try:
        return parser.parse(time_str)
    except ValueError:
        if "PM" in time_str.upper():
            return datetime.strptime(time_str, "%I %p")
        else:
            return datetime.strptime(time_str, "%H:%M")

def Clockout(userid, name, time):
    today = datetime.now().date()  # Use datetime.now().date() for today's date
    a = Clock.find_one({'date': today.isoformat(), 'name': name})  # Convert date to ISO format

    if a:
        clockin_time = parser.parse(a['clockin'])

        if not time:
            default_clockout_time = datetime.combine(today, datetime.strptime("16:05", "%H:%M").time())
        else:
            clockout_time = parse_time_string(time)

        total_seconds_worked = (clockout_time - clockin_time).total_seconds()
        total_hours_worked = total_seconds_worked / 3600
        remaining_seconds = total_seconds_worked % 3600
        total_minutes_worked = remaining_seconds // 60
        remark = "N/A" if total_hours_worked >= 8 else "Incomplete"

        Clock.find_one_and_update(
            {'date': today.isoformat(), 'name': name},
            {'$set': {
                'clockout': time,
                'total_hours_worked': f'{int(total_hours_worked)} hours {int(total_minutes_worked)} minutes',
                'remark': remark
            }}
        )

        return f'{int(total_hours_worked)} hours {int(total_minutes_worked)} minutes', remark
    else:
        Clock.insert_one({
            'userid': userid,
            'date': today.isoformat(),
            'name': name,
            'clockout': time
        })
        return None, None

# User Page Attendance Details
def attendance_details(userid: str):
    clock_records = Clock.find({"userid": userid}, {'_id': 0})
    return list(clock_records)

# Admin Page Attendance Details
def get_attendance_by_date(date):
    attendance_data = list(Clock.find({"date": str(date)}, {"_id": 0}))
    return attendance_data

# Employee ID
def get_employee_id_from_db(name: str):
    try:
        user = Users.find_one({'name': name}, {'Employee_ID': 1})
        if user:
            return user["Employee_ID"]
        else:
            return None
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

def add_employee_id_to_leave_details(employee_id: str, employee_name: str , userid:str):
    try:
        Leave.insert_one({
            'userid': userid,
            'employeeName': employee_name,
            'Employee_ID' : employee_id,
            'time': "",  
            'leaveType': "",  
            'selectedDate': "",  
            'requestDate': "", 
            'reason': "" 
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Leave Management
# Date Format 
def format_timestamp(timestamp):
    parsed_timestamp = datetime.fromisoformat(str(timestamp))
    timezone = pytz.timezone("Asia/Kolkata")
    formatted_timestamp = parsed_timestamp.astimezone(timezone)
    return formatted_timestamp.strftime("%d-%m-%Y")

# Weekend calculation
def count_weekdays(start_date, end_date):
    """
    Count the number of weekdays (excluding Sundays) between two dates.
    """
    count = 0
    current_date = start_date
    while current_date <= end_date:
        if current_date.weekday() != 6:  
            count += 1
        current_date += timedelta(days=1)
    return count


def store_leave_request(userid, employee_name, time, leave_type, selected_date, request_date, reason):
    # Check if the request date is a Sunday (weekday() returns 6 for Sunday)
    if request_date.weekday() == 6:
        return "Request date is a Sunday. Request not allowed."

    if leave_type == "Sick Leave" and format_timestamp(selected_date) != format_timestamp(request_date):
        return "Sick Leave is permitted for today only."

# # Check if Sick Leave is not allowed for Fridays and Mondays
#     if leave_type == "Sick Leave" and selected_date.weekday() == 5:
#       return "Sick Leave is not allowed for Fridays and Mondays."
    
    if leave_type == "Casual Leave":
        weekdays_count = count_weekdays(request_date + timedelta(days=1), selected_date)
        if weekdays_count < 1:
            return "Two days prior notice for Casual Leave."
        
    if leave_type == "Casual Leave":
        # Check if the next day is already taken for Sick Leave
        if is_leave_taken(userid, selected_date + timedelta(days=1), "Sick Leave"):
            return "Casual Leave cannot be taken if the next day is Sick Leave."
        
        # Check if the previous day is already taken for Sick Leave
        if is_leave_taken(userid, selected_date - timedelta(days=1), "Sick Leave"):
            return "Casual Leave cannot be taken if the previous day is Sick Leave."
        
        # Check if the next day is already taken for Casual Leave
        if is_leave_taken(userid, selected_date + timedelta(days=1), "Casual Leave"):
            return "Casual Leave cannot be taken if the next day is also Casual Leave."
        
        # Check if the previous day is already taken for Casual Leave
        if is_leave_taken(userid, selected_date - timedelta(days=1), "Casual Leave"):
            return "Casual Leave cannot be taken if the previous day is also Casual Leave."


      # Check if selected date is a Friday or Monday for Sick Leave
    # if leave_type == "Sick Leave" and selected_date.weekday() in [1, 5]:
    #     return "Sick Leave is not allowed for Fridays and Mondays."
    
    current_month = selected_date.strftime("%m-%Y")
    print(leave_type,current_month)
    leave_count_cursor = Leave.aggregate([
    {
        '$match': {
            'selectedDate': {
                '$regex': current_month
            },
             'leaveType': leave_type
        }
    }, {
        '$group': {
            '_id': '$leaveType',
            'count': {
                '$sum': 1
            }
        }
    }
    ])
    # print(list(leave_count_cursor))
    leave_count = list(leave_count_cursor)
    print(leave_count)
    if leave_count:
        leave_count = leave_count[0]
        if  leave_type == "Sick Leave":
            if leave_count["_id"] == "Sick Leave" and leave_count["count"] >= 1:
                return  f"You have already taken a {leave_type} this month"
        else :
            if leave_count["_id"] == "Casual Leave" and leave_count["count"] >= 1:
                return  f"You have already taken a {leave_type} this month"
    


    employee_id = get_employee_id_from_db(employee_name)
    
    new_leave = {
        "userid": userid,
        "Employee_ID": employee_id, 
        "employeeName": employee_name,
        "time": time,
        "leaveType": leave_type,
        "selectedDate": format_timestamp(selected_date),
        "requestDate": format_timestamp(request_date),
        "reason": reason,
        
    }

    result = Leave.insert_one(new_leave)

    print("result", result)
    return "Leave request stored successfully"

def is_leave_taken(userid, selected_date, leave_type):
    # Check if leave of given type is taken on the selected date
    leave_entry = Leave.find_one({
        "userid": userid,
        "selectedDate": format_timestamp(selected_date),
        "leaveType": leave_type
    })
    
    return leave_entry is not None


# # User Page Leave History
# def leave_History_Details(userid: str):
#     leave_History = Leave.find({'userid' : userid}, {'_id': 0})
#     return list(leave_History)

# User Page Leave History
def leave_History_Details(userid: str,selected_option):
    if selected_option == "Leave":
        leave_request = list(Leave.find({'userid' : userid, "leaveType": {"$in": ["Sick Leave", "Casual Leave"]}}))
    elif selected_option == "LOP":
        leave_request = list(Leave.find({'userid' : userid, "leaveType": "Other Leave"}))
    elif selected_option == "Permission":
        leave_request = list(Leave.find({'userid' : userid,"leaveType": "Permission"}))
    else:
        leave_request = []
    
    for index, leave in enumerate(leave_request):
        leave_request[index] = cleanid(leave)
        
    return leave_request

# # Admin Page Leave Requests
# def get_user_leave_requests():
#     list1 = list()
#     res = Leave.find()
#     print(res)
#     for user in res:
#         cleanid(user)
#         list1.append(user)
#     return list1

# # Admin Response for Leave Request
# def updated_user_leave_requests_status_in_mongo(userid, status):
#     try:
#         print("Updating status in MongoDB:")
#         print("User ID:", userid)
#         print("Status:", status)
        
#         result = Leave.update_one({"_id": ObjectId(userid)}, {"$set": {"status": status}})
#         if result.modified_count > 0:
#             return True
#         else:
#             return False
#     except Exception as e:
#         print(f"Error updating status: {e}")
#         raise Exception("Error updating status in MongoDB")

#     return False

# # Admin Page Leave Requests
# def get_user_leave_requests(request_date):
#     leave_request = list(Leave.find({"requestDate": request_date.strftime("%d-%m-%Y")}))
    
#     for index, leave in enumerate(leave_request):
#         leave_request[index] = cleanid(leave)
        
#     return leave_request

# Admin Page Leave Requests
def get_user_leave_requests(request_date, selected_option):
    if selected_option == "Leave":
        leave_request = list(Leave.find({"requestDate": request_date.strftime("%d-%m-%Y"), "leaveType": {"$in": ["Sick Leave", "Casual Leave"]}}))
    elif selected_option == "LOP":
        leave_request = list(Leave.find({"requestDate": request_date.strftime("%d-%m-%Y"), "leaveType": "Other Leave"}))
    elif selected_option == "Permission":
        leave_request = list(Leave.find({"requestDate": request_date.strftime("%d-%m-%Y"), "leaveType": "Permission"}))
    else:
        leave_request = []
    
    for index, leave in enumerate(leave_request):
        leave_request[index] = cleanid(leave)
        
    return leave_request

# Admin Response for Leave Request
def updated_user_leave_requests_status_in_mongo(leave_id, status):
    try:
        print("Updating status in MongoDB:")
        print("Received Leave ID:", leave_id)
        print("Received Status:", status)
        
        result = Leave.update_one(
            {"_id": ObjectId(leave_id)},
            {"$set": {"status": status}}
        )
        print(result)
        if result.modified_count > 0:
            return {"message": "Status updated successfully"}
        else:
            return {"message": "No records found for the given leave ID or the status is already updated"}
            
    except Exception as e:
        print(f"Error updating status: {e}")
        raise Exception("Error updating status in MongoDB")


# Admin Page Leave History Dashboard
def get_approved_leave_history():
        leave_history = Leave.find({"status": "Approved"})
        return [{**item, "_id": str(item["_id"])} for item in leave_history]

# Remote Work Request
def store_remote_work_request(userid, employeeName, time, from_date, to_date, request_date, reason):
    print("Storing remote work request...")
    if to_date < from_date:
        return "To date should be after or equal to from date."

    num_weekdays_request_to_from = count_weekdays(request_date, from_date)
    
    if request_date.weekday() == 6:
        return "Request date is a Sunday. Remote work request not allowed."

    num_weekdays_from_to = count_weekdays(from_date, to_date)
    
    future_days = (to_date - from_date).days
    
    employee_id = get_employee_id_from_db(employeeName)
     
    if num_weekdays_request_to_from == 4:
        if num_weekdays_from_to <= 3 and future_days <= 3:
            new_request = {
                "userid": userid,
                "Employee_ID": employee_id ,
                "employeeName": employeeName,
                "time": time,
                "fromDate": format_timestamp(from_date),  # Convert back to ISO format
                "toDate": format_timestamp(to_date),  # Convert back to ISO format
                "requestDate": format_timestamp(request_date),  # Convert back to ISO format
                "reason": reason,
                
            }
            result = RemoteWork.insert_one(new_request)
            print("result", result)
            return "Remote request successful"
        else:
            return "Remote work can be taken for a maximum of 3 days "
    else:
        return  "Remote work request can only be made atleast 5 days prior"

# User Remote Work History
def Remote_History_Details(userid:str):
    Remote_History = RemoteWork.find({'userid' : userid},{'_id':0})
    return list(Remote_History)

# Admin Page Remote Requests
def get_remote_work_requests():
    list1 = list()
    res = RemoteWork.find()
    print(res)
    for user in res:
        cleanid(user)
        list1.append(user)
    return list1

# Admin Response for Remote Work
def update_remote_work_request_status_in_mongo(userid, status):
    try:
        print("Updating status in MongoDB:")
        print("User ID:", userid)
        print("Status:", status)
        
        result = RemoteWork.update_one({"_id": ObjectId(userid)}, {"$set": {"status": status}})
        if result.modified_count > 0:
            return True
        else:
            return False
    except Exception as e:
        print(f"Error updating status: {e}")
        raise Exception("Error updating status in MongoDB")

    return False



def store_Other_leave_request(userid, employee_name, time, leave_type, selected_date, To_date, request_date, reason):
    # Check if the request date is a Sunday (weekday() returns 6 for Sunday)
    if request_date.weekday() == 6:
        return "Request date is a Sunday. Request not allowed."

    if To_date < selected_date:
        return "To date should be after or equal to from date."

    num_weekdays_request_to_from = count_weekdays(request_date, selected_date)
    
    # You can remove the restriction for "Other Leave" to be made at least 5 days prior
    # if num_weekdays_request_to_from == 2:
    if leave_type == "Other Leave":
        weekdays_count = count_weekdays(request_date + timedelta(days=1), selected_date)
        # if weekdays_count < 1:
        #     return "Two days prior notice for Other Leave." 
        # Check the number of weekdays between the selected dates
        num_weekdays_from_to = count_weekdays(selected_date, To_date)
        
        future_days = (To_date - selected_date).days
        
        employee_id = get_employee_id_from_db(employee_name)
         
        if num_weekdays_from_to <= 3 and future_days <= 3:
            new_request = {
                "userid": userid,
                "Employee_ID": employee_id, 
                "employeeName": employee_name,
                "time": time,
                "leaveType": leave_type,
                "selectedDate": format_timestamp(selected_date),
                "ToDate" : format_timestamp(To_date),
                "requestDate": format_timestamp(request_date),
                "reason": reason,
            }
            result = Leave.insert_one(new_request)
            print("result", result)
            return "Leave request stored successfully"
        else:
            return "Other Leave can be taken for a maximum of 3 days"
    # else:
        # return "Other Leave request can only be made at least 2 days prior"


def store_Permission_request(userid, employee_name, time, leave_type, selected_date, request_date,Time_Slot, reason):
    # Check if the request date is a Sunday (weekday() returns 6 for Sunday)
    if request_date.weekday() == 6:
        return "Request date is a Sunday. Request not allowed."
 
    
    if leave_type == "Permission" and format_timestamp(selected_date) != format_timestamp(request_date):
        return "Permission is permitted for today only."
     
    employee_id = get_employee_id_from_db(employee_name)
    
    new_leave = {
        "userid": userid,
        "Employee_ID": employee_id, 
        "employeeName": employee_name,
        "time": time,
        "leaveType": leave_type,
        "selectedDate": format_timestamp(selected_date),
        "requestDate": format_timestamp(request_date),
        "timeSlot": Time_Slot,
        "reason": reason,
        
    }

    result = Leave.insert_one(new_leave)

    print("result", result)
    return "Leave request stored successfully"




def Otherleave_History_Details(userid):

    # Filter by userid and leaveType "Other"
    leave_history = list(Leave.find({"userid": userid, "leaveType": "Other Leave"}))

    # Convert ObjectId to string for JSON serialization
    for item in leave_history:
        item["_id"] = str(item["_id"])

    return leave_history

def normal_leave_details(userid):

    # Filter by userid and leaveType "Other"
    leave_history = list(Leave.find({"userid": userid, "leaveType": {"$in": ["Sick Leave", "Casual Leave"]}}))

    # Convert ObjectId to string for JSON serialization
    for item in leave_history:
        item["_id"] = str(item["_id"])

    return leave_history


def Permission_History_Details(userid):

    # Filter by userid and leaveType "Other"
    leave_history = list(Leave.find({"userid": userid, "leaveType": "Other Leave"}))

    # Convert ObjectId to string for JSON serialization
    for item in leave_history:
        item["_id"] = str(item["_id"])

    return leave_history