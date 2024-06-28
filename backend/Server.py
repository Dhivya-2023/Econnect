# from Mongo import Otherleave_History_Details,Permission_History_Details,normal_leave_details,store_Other_leave_request,get_approved_leave_history,get_remote_work_requests,attendance_details,leave_History_Details,Remote_History_Details,get_attendance_by_date,update_remote_work_request_status_in_mongo,updated_user_leave_requests_status_in_mongo,get_user_leave_requests, get_employee_id_from_db,store_Permission_request
# from model import Item4,Item,Item2,Item3,Csvadd,Csvedit,Csvdel,CT,Item5,Item6,RemoteWorkRequest,Item7,Item8
# from fastapi import FastAPI, HTTPException,Path,Query, HTTPException,Form
# from fastapi.middleware.cors import CORSMiddleware
# from fastapi import Depends, FastAPI,Body
# from auth.auth_bearer import JWTBearer
# from http.client import HTTPException
# from datetime import datetime
# from dateutil import parser
# from typing import Union
# import uvicorn
# import Mongo
# import pytz

# app = FastAPI()
# origins = ["*"]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
#     allow_headers=["*"],
# )

# @app.get("/")
# def read_root():
#     return {"Hello": "World"}

# @app.post('/addjson',dependencies=[Depends(JWTBearer())])
# def Addjson(item:Item4):
#     a=Mongo.Adddata(item.data,item.id,item.filename)
#     return {'data':a}

# @app.post('/Editjson',dependencies=[Depends(JWTBearer())])
# def editjson(item:Item4):
#     a=Mongo.Editdata(item.data,item.id,item.filename)
#     return {'data':a}

# @app.post('/deljson',dependencies=[Depends(JWTBearer())])
# def Deljson(item:Item3):
#     a=Mongo.deletedata(item.id)
#     return{'data':'Successfully Deleted'}

# @app.post('/Addcsvjson')
# async def Addcsvjson(Data:Csvadd):
#     a=Mongo.addcsv(name=Data.name,data=Data.data,id=Data.fileid)
#     return a

# @app.post('/Getcsvjson')
# async def Getcsvjson(item:Item3):
#     a=Mongo.Getcsvdata(item.id)
#     return a

# @app.post('/Updatecsvjson')
# async def Updatecsvjson(item:Csvedit):
#     print(item)
#     a=Mongo.Updatecsv(data=item.data,id=item.id,fileid=item.fileid,name=item.name)
#     return a

# @app.post('/deletecsvjson')
# async def Deletecsv(item:Csvdel):
#     a=Mongo.Deletecsv(fileid=item.fileid,id=item.id )
#     return a

# @app.post("/signup")
# def Signup(item: Item):
#     jwt=Mongo.Signup(item.email,item.password,item.name)
#     return jwt

# @app.post("/signin")
# def Signup(item: Item2):
#     jwt=Mongo.signin(item.email,item.password)
#     print(jwt)
#     return jwt

# # Google Signin
# @app.post("/Gsignin")
# def Signup(item: Item5):
#     print(item.dict())
#     jwt=Mongo.Gsignin(item.client_name,item.email)
#     print(jwt)
#     return jwt

# # Userid
# @app.post('/id',dependencies=[Depends(JWTBearer())])
# def userbyid(item:Item3):
#     a=Mongo.Userbyid(item.id)
#     return {'data': a}

# # Time Management
# @app.post('/Clockin')
# def clockin(Data: CT):
#     print(Data)
#     a = Mongo.Clockin(userid=Data.userid, name=Data.name, time=Data.time)
#     return {"success": a}

# @app.post('/Clockout')
# def clockin(Data:CT):
#     a=Mongo.Clockout(userid=Data.userid,name=Data.name,time=Data.time)
#     print(a)
#     return a 

# @app.post('/Clockout')
# def clockout(Data: CT):
#     total_hours_worked = Mongo.Clockout(userid=Data.userid,name=Data.name, time=Data.time)
#     return {"message": f"Total hours worked today: {total_hours_worked} hours"}

# # Clockin Details
# @app.get("/clock-records/{userid}")
# async def get_clock_records(userid: str = Path(..., title="The name of the user whose clock records you want to fetch")):
#     try:
#         clock_records = attendance_details(userid)
#         return {"clock_records": clock_records}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# # Admin Dashboard Attendance
# @app.get("/attendance/")
# async def fetch_attendance_by_date(date: str = Query(...)):
#     try:
#         formatted_date = datetime.strptime(date, "%Y-%m-%d").date()
#     except ValueError:
#         raise HTTPException(status_code=422, detail="Invalid date format. Use yyyy-MM-dd")

#     attendance_data = get_attendance_by_date(formatted_date)
#     if not attendance_data:
#         raise HTTPException(status_code=404, detail="No attendance data found for the selected date")

#     return {"attendance": attendance_data}

# # Employee ID
# @app.get("/get_EmployeeId/{name}")
# async def get_employee_id(name: str = Path(..., title="The username of the user")):
#     try:
#         employee_id = get_employee_id_from_db(name)
#         if employee_id:
#             return {"Employee_ID": employee_id}
#         else:
#             raise HTTPException(status_code=404, detail="User not found")
#     except Exception as e:
#         raise HTTPException(status_code=500, detail="Internal server error")

# # Leave Management

# @app.post('/leave-request')
# def leave_request(item: Item6):
#     try:
#         selected_date_str = item.selectedDate[:-1] if item.selectedDate.endswith('Z') else item.selectedDate
#         request_date_str = item.requestDate[:-1] if item.requestDate.endswith('Z') else item.requestDate

#         selected_date = datetime.strptime(selected_date_str, "%Y-%m-%dT%H:%M:%S.%f")
#         request_date = datetime.strptime(request_date_str, "%Y-%m-%dT%H:%M:%S.%f")

#         selected_date_utc = pytz.utc.localize(selected_date)
#         request_date_utc = pytz.utc.localize(request_date)

      
#         result = Mongo.store_leave_request(
#                 item.userid,
#                 item.employeeName,
#                 item.time,
#                 item.leaveType,
#                 selected_date_utc,
#                 request_date_utc,
#                 item.reason,
#             )

#         return {"message": "Leave request stored successfully", "result": result}
#     except Exception as e:
#         raise HTTPException(400, str(e))
    
    


# # # Leave History

# @app.get("/leave-History/{userid}")
# async def get_leave_History(userid: str):
#     try:
        
#         leave_history = Mongo.normal_leave_details(userid)
#         return {"leave_history" : leave_history}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))





# # Admin Page User Leave Requests
# @app.get("/user_leave_requests/")
# async def fetch_user_leave_requests(requestDate: str = Query(..., alias="requestDate"), selectedOption: str = Query(..., alias="selectedOption")):
#     try:
#         formatted_date = datetime.strptime(requestDate, "%Y-%m-%d").date()
#     except ValueError:
#         raise HTTPException(status_code=422, detail="Invalid date format. Use yyyy-MM-dd")

#     user_leave_requests = get_user_leave_requests(formatted_date, selectedOption)
#     if not user_leave_requests:
#         raise HTTPException(status_code=404, detail="No leave data found for the selected date")

#     return {"user_leave_requests": user_leave_requests}

# # Admin Leave Responses
# @app.put("/updated_user_leave_requests")
# async def updated_user_leave_requests_status(leave_id: str = Form(...), status: str = Form(...)):
#     try:
#         response = updated_user_leave_requests_status_in_mongo(leave_id, status)
#         return response
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# # Remote Work Request
# @app.post("/remote-work-request")
# def remote_work_request(request: RemoteWorkRequest):
#     try:
#         from_date_utc = parser.isoparse(request.fromDate)
#         to_date_utc = parser.isoparse(request.toDate)
#         request_date_utc = parser.isoparse(request.requestDate)

#         from_date_utc = from_date_utc.astimezone(pytz.utc)
#         to_date_utc = to_date_utc.astimezone(pytz.utc)
#         request_date_utc = request_date_utc.astimezone(pytz.utc)

#         result = Mongo.store_remote_work_request(
#             request.userid,
#             request.employeeName,
#             request.time,
#             from_date_utc,
#             to_date_utc,
#             request_date_utc,
#             request.reason,
#         )
#         return {"message": "Remote work request stored successfully", "result": result}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e)) 

# # Remote Work History    
# @app.get("/Remote-History/{userid}")
# async def get_Remote_History(userid:str = Path(..., title="The name of the user whose Remote History you want to fetch")):
#     try:
#         Remote_History = Remote_History_Details(userid)
#         return{"Remote_History": Remote_History}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# # Admin Page User Remote Work Requests
# @app.get("/remote_work_requests")
# async def fetch_remote_work_requests():
#     remote_work_requests = get_remote_work_requests()
#     return {"remote_work_requests": remote_work_requests}

# # Admin Remote Work Responses
# @app.put("/updated_remote_work_requests")
# async def update_remote_work_request_status(userid: str = Form(...), status: str = Form(...)):
#     try:
#         updated = update_remote_work_request_status_in_mongo(userid, status)
#         if updated:
#             return {"message": "Status updated successfully"}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# # Admin Page User Leave History
# @app.get("/leave-history")
# def get_leave_history():
#     leave_history = get_approved_leave_history()
#     return {"leave_history": list(leave_history)}

# # Admin ID
# @app.post('/id',dependencies=[Depends(JWTBearer())])
# def adminid(item:Item3):
#     a=Mongo.adminbyid(item.id)
#     return {'data': a}

# @app.post("/admin_signup")
# def adminid_Signup(item: Item):
#     jwt=Mongo.admin_Signup(item.email,item.password,item.name)
#     return jwt

# @app.post("/admin_signin")
# def admin_Signup(item: Item2):
#     jwt=Mongo.admin_signin(item.email,item.password)
#     print(jwt)
#     return jwt

# # Admin Signin 
# @app.post("/admin_Gsignin")
# def admin_signup(item: Item5):
#     print(item.dict())
#     jwt=Mongo.admin_Gsignin(item.client_name,item.email)
#     print(jwt)
#     return jwt


# @app.post('/Other-leave-request')
# def leave_request(item: Item7):
#     try:
#         selected_date_str = item.selectedDate[:-1] if item.selectedDate.endswith('Z') else item.selectedDate
#         To_date_str = item.ToDate[:-1] if item.ToDate.endswith('Z') else item.ToDate
#         request_date_str = item.requestDate[:-1] if item.requestDate.endswith('Z') else item.requestDate

#         selected_date = datetime.strptime(selected_date_str, "%Y-%m-%dT%H:%M:%S.%f")
#         To_date = datetime.strptime(To_date_str, "%Y-%m-%dT%H:%M:%S.%f")
#         request_date = datetime.strptime(request_date_str, "%Y-%m-%dT%H:%M:%S.%f")

#         selected_date_utc = pytz.utc.localize(selected_date)
#         To_date_utc = pytz.utc.localize(To_date)
#         request_date_utc = pytz.utc.localize(request_date)

#         # Now you can continue with the rest of your code...
      
#         result = store_Other_leave_request(
#                 item.userid,
#                 item.employeeName,
#                 item.time,
#                 item.leaveType,
#                 selected_date_utc,
#                 To_date_utc,
#                 request_date_utc,
#                 item.reason,
#             )

#         return {"message": "Leave request stored successfully", "result": result}
#     except Exception as e:
#         raise HTTPException(400, str(e))
    
    
    
# @app.post('/Permission-request')
# def leave_request(item: Item8):
#     try:
#         selected_date_str = item.selectedDate[:-1] if item.selectedDate.endswith('Z') else item.selectedDate
#         request_date_str = item.requestDate[:-1] if item.requestDate.endswith('Z') else item.requestDate
    

#         selected_date = datetime.strptime(selected_date_str, "%Y-%m-%dT%H:%M:%S.%f")
#         request_date = datetime.strptime(request_date_str, "%Y-%m-%dT%H:%M:%S.%f")

#         selected_date_utc = pytz.utc.localize(selected_date)
#         request_date_utc = pytz.utc.localize(request_date)

      
#         result = store_Permission_request(
#                 item.userid,
#                 item.employeeName,
#                 item.time,
#                 item.leaveType,
#                 selected_date_utc,
#                 request_date_utc,
#                 item.timeSlot,
#                 item.reason,
#             )

#         return {"message": "Leave request stored successfully", "result": result}
#     except Exception as e:
#         raise HTTPException(400, str(e))
    
# @app.get("/Other-leave-history/{userid}")
# async def get_other_leave_history(userid: str = Path(..., title="The ID of the user")):
#     try:
#         # Call your function to get the leave history for the specified user
#         leave_history = Otherleave_History_Details(userid)

#         # Return the leave history
#         return {"leave_history": leave_history}
#     except Exception as e:
#         # If an exception occurs, return a 500 Internal Server Error
#         raise HTTPException(status_code=500, detail=str(e))
    
    
# @app.get("/Permission-history/{userid}")
# async def get_Permission_history(userid: str = Path(..., title="The ID of the user")):
#     try:
#         # Call your function to get the leave history for the specified user
#         leave_history = Permission_History_Details(userid)

#         # Return the leave history
#         return {"leave_history": leave_history}
#     except Exception as e:
#         # If an exception occurs, return a 500 Internal Server Error
#         raise HTTPException(status_code=500, detail=str(e))
            


from Mongo import Otherleave_History_Details,Permission_History_Details,normal_leave_details,store_Other_leave_request,get_approved_leave_history,get_remote_work_requests,attendance_details,leave_History_Details,Remote_History_Details,get_attendance_by_date,update_remote_work_request_status_in_mongo,updated_user_leave_requests_status_in_mongo,get_user_leave_requests, get_employee_id_from_db,store_Permission_request
from model import Item4,Item,Item2,Item3,Csvadd,Csvedit,Csvdel,CT,Item5,Item6,RemoteWorkRequest,Item7,Item8
from fastapi import FastAPI, HTTPException,Path,Query, HTTPException,Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, FastAPI,Body
from auth.auth_bearer import JWTBearer
from http.client import HTTPException
from datetime import datetime
from dateutil import parser
from typing import Union
import uvicorn
import Mongo
import pytz

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post('/addjson',dependencies=[Depends(JWTBearer())])
def Addjson(item:Item4):
    a=Mongo.Adddata(item.data,item.id,item.filename)
    return {'data':a}

@app.post('/Editjson',dependencies=[Depends(JWTBearer())])
def editjson(item:Item4):
    a=Mongo.Editdata(item.data,item.id,item.filename)
    return {'data':a}

@app.post('/deljson',dependencies=[Depends(JWTBearer())])
def Deljson(item:Item3):
    a=Mongo.deletedata(item.id)
    return{'data':'Successfully Deleted'}

@app.post('/Addcsvjson')
async def Addcsvjson(Data:Csvadd):
    a=Mongo.addcsv(name=Data.name,data=Data.data,id=Data.fileid)
    return a

@app.post('/Getcsvjson')
async def Getcsvjson(item:Item3):
    a=Mongo.Getcsvdata(item.id)
    return a

@app.post('/Updatecsvjson')
async def Updatecsvjson(item:Csvedit):
    print(item)
    a=Mongo.Updatecsv(data=item.data,id=item.id,fileid=item.fileid,name=item.name)
    return a

@app.post('/deletecsvjson')
async def Deletecsv(item:Csvdel):
    a=Mongo.Deletecsv(fileid=item.fileid,id=item.id )
    return a

@app.post("/signup")
def Signup(item: Item):
    jwt=Mongo.Signup(item.email,item.password,item.name)
    return jwt

@app.post("/signin")
def Signup(item: Item2):
    jwt=Mongo.signin(item.email,item.password)
    print(jwt)
    return jwt

# Google Signin
@app.post("/Gsignin")
def Signup(item: Item5):
    print(item.dict())
    jwt=Mongo.Gsignin(item.client_name,item.email)
    print(jwt)
    return jwt

# Userid
@app.post('/id',dependencies=[Depends(JWTBearer())])
def userbyid(item:Item3):
    a=Mongo.Userbyid(item.id)
    return {'data': a}

# Time Management
@app.post('/Clockin')
def clockin(Data: CT):
    print(Data)
    a = Mongo.Clockin(userid=Data.userid, name=Data.name, time=Data.time)
    return {"success": a}

@app.post('/Clockout')
def clockin(Data:CT):
    a=Mongo.Clockout(userid=Data.userid,name=Data.name,time=Data.time)
    print(a)
    return a 

@app.post('/Clockout')
def clockout(Data: CT):
    total_hours_worked = Mongo.Clockout(userid=Data.userid,name=Data.name, time=Data.time)
    return {"message": f"Total hours worked today: {total_hours_worked} hours"}

# Clockin Details
@app.get("/clock-records/{userid}")
async def get_clock_records(userid: str = Path(..., title="The name of the user whose clock records you want to fetch")):
    try:
        clock_records = attendance_details(userid)
        return {"clock_records": clock_records}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Admin Dashboard Attendance
@app.get("/attendance/")
async def fetch_attendance_by_date(date: str = Query(...)):
    try:
        formatted_date = datetime.strptime(date, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=422, detail="Invalid date format. Use yyyy-MM-dd")

    attendance_data = get_attendance_by_date(formatted_date)
    if not attendance_data:
        raise HTTPException(status_code=404, detail="No attendance data found for the selected date")

    return {"attendance": attendance_data}

# Employee ID
@app.get("/get_EmployeeId/{name}")
async def get_employee_id(name: str = Path(..., title="The username of the user")):
    try:
        employee_id = get_employee_id_from_db(name)
        if employee_id:
            return {"Employee_ID": employee_id}
        else:
            raise HTTPException(status_code=404, detail="User not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal server error")

# Leave Management

@app.post('/leave-request')
def leave_request(item: Item6):
    try:
        selected_date_str = item.selectedDate[:-1] if item.selectedDate.endswith('Z') else item.selectedDate
        request_date_str = item.requestDate[:-1] if item.requestDate.endswith('Z') else item.requestDate

        selected_date = datetime.strptime(selected_date_str, "%Y-%m-%dT%H:%M:%S.%f")
        request_date = datetime.strptime(request_date_str, "%Y-%m-%dT%H:%M:%S.%f")

        selected_date_utc = pytz.utc.localize(selected_date)
        request_date_utc = pytz.utc.localize(request_date)

      
        result = Mongo.store_leave_request(
                item.userid,
                item.employeeName,
                item.time,
                item.leaveType,
                selected_date_utc,
                request_date_utc,
                item.reason,
            )

        return {"message": "Leave request stored successfully", "result": result}
    except Exception as e:
        raise HTTPException(400, str(e))
    
    


# # Leave History

@app.get("/leave-History/{userid}")
async def get_leave_History(userid: str):
    try:
        
        leave_history = Mongo.normal_leave_details(userid)
        return {"leave_history" : leave_history}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))





# Admin Page User Leave Requests
@app.get("/user_leave_requests/")
async def fetch_user_leave_requests(requestDate: str = Query(..., alias="requestDate"), selectedOption: str = Query(..., alias="selectedOption")):
    try:
        formatted_date = datetime.strptime(requestDate, "%Y-%m-%d").date()
    except ValueError:
        raise HTTPException(status_code=422, detail="Invalid date format. Use yyyy-MM-dd")

    user_leave_requests = get_user_leave_requests(formatted_date, selectedOption)
    if not user_leave_requests:
        raise HTTPException(status_code=404, detail="No leave data found for the selected date")

    return {"user_leave_requests": user_leave_requests}

# Admin Leave Responses
@app.put("/updated_user_leave_requests")
async def updated_user_leave_requests_status(leave_id: str = Form(...), status: str = Form(...)):
    try:
        response = updated_user_leave_requests_status_in_mongo(leave_id, status)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Remote Work Request
@app.post("/remote-work-request")
def remote_work_request(request: RemoteWorkRequest):
    try:
        from_date_utc = parser.isoparse(request.fromDate)
        to_date_utc = parser.isoparse(request.toDate)
        request_date_utc = parser.isoparse(request.requestDate)

        from_date_utc = from_date_utc.astimezone(pytz.utc)
        to_date_utc = to_date_utc.astimezone(pytz.utc)
        request_date_utc = request_date_utc.astimezone(pytz.utc)

        result = Mongo.store_remote_work_request(
            request.userid,
            request.employeeName,
            request.time,
            from_date_utc,
            to_date_utc,
            request_date_utc,
            request.reason,
        )
        return {"message": "Remote work request stored successfully", "result": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 

# Remote Work History    
@app.get("/Remote-History/{userid}")
async def get_Remote_History(userid:str = Path(..., title="The name of the user whose Remote History you want to fetch")):
    try:
        Remote_History = Remote_History_Details(userid)
        return{"Remote_History": Remote_History}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Admin Page User Remote Work Requests
@app.get("/remote_work_requests")
async def fetch_remote_work_requests():
    remote_work_requests = get_remote_work_requests()
    return {"remote_work_requests": remote_work_requests}

# Admin Remote Work Responses
@app.put("/updated_remote_work_requests")
async def update_remote_work_request_status(userid: str = Form(...), status: str = Form(...)):
    try:
        updated = update_remote_work_request_status_in_mongo(userid, status)
        if updated:
            return {"message": "Status updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Admin Page User Leave History
@app.get("/leave-history")
def get_leave_history():
    leave_history = get_approved_leave_history()
    return {"leave_history": list(leave_history)}

# Admin ID
@app.post('/id',dependencies=[Depends(JWTBearer())])
def adminid(item:Item3):
    a=Mongo.adminbyid(item.id)
    return {'data': a}

@app.post("/admin_signup")
def adminid_Signup(item: Item):
    jwt=Mongo.admin_Signup(item.email,item.password,item.name)
    return jwt

@app.post("/admin_signin")
def admin_Signup(item: Item2):
    jwt=Mongo.admin_signin(item.email,item.password)
    print(jwt)
    return jwt

# Admin Signin 
@app.post("/admin_Gsignin")
def admin_signup(item: Item5):
    print(item.dict())
    jwt=Mongo.admin_Gsignin(item.client_name,item.email)
    print(jwt)
    return jwt


@app.post('/Other-leave-request')
def leave_request(item: Item7):
    try:
        selected_date_str = item.selectedDate[:-1] if item.selectedDate.endswith('Z') else item.selectedDate
        To_date_str = item.ToDate[:-1] if item.ToDate.endswith('Z') else item.ToDate
        request_date_str = item.requestDate[:-1] if item.requestDate.endswith('Z') else item.requestDate

        selected_date = datetime.strptime(selected_date_str, "%Y-%m-%dT%H:%M:%S.%f")
        To_date = datetime.strptime(To_date_str, "%Y-%m-%dT%H:%M:%S.%f")
        request_date = datetime.strptime(request_date_str, "%Y-%m-%dT%H:%M:%S.%f")

        selected_date_utc = pytz.utc.localize(selected_date)
        To_date_utc = pytz.utc.localize(To_date)
        request_date_utc = pytz.utc.localize(request_date)

        # Now you can continue with the rest of your code...
      
        result = store_Other_leave_request(
                item.userid,
                item.employeeName,
                item.time,
                item.leaveType,
                selected_date_utc,
                To_date_utc,
                request_date_utc,
                item.reason,
            )

        return {"message": "Leave request stored successfully", "result": result}
    except Exception as e:
        raise HTTPException(400, str(e))
    
    
    
@app.post('/Permission-request')
def leave_request(item: Item8):
    try:
        selected_date_str = item.selectedDate[:-1] if item.selectedDate.endswith('Z') else item.selectedDate
        request_date_str = item.requestDate[:-1] if item.requestDate.endswith('Z') else item.requestDate
    

        selected_date = datetime.strptime(selected_date_str, "%Y-%m-%dT%H:%M:%S.%f")
        request_date = datetime.strptime(request_date_str, "%Y-%m-%dT%H:%M:%S.%f")

        selected_date_utc = pytz.utc.localize(selected_date)
        request_date_utc = pytz.utc.localize(request_date)

      
        result = store_Permission_request(
                item.userid,
                item.employeeName,
                item.time,
                item.leaveType,
                selected_date_utc,
                request_date_utc,
                item.timeSlot,
                item.reason,
            )

        return {"message": "Leave request stored successfully", "result": result}
    except Exception as e:
        raise HTTPException(400, str(e))
    
@app.get("/Other-leave-history/{userid}")
async def get_other_leave_history(userid: str = Path(..., title="The ID of the user")):
    try:
        # Call your function to get the leave history for the specified user
        leave_history = Otherleave_History_Details(userid)

        # Return the leave history
        return {"leave_history": leave_history}
    except Exception as e:
        # If an exception occurs, return a 500 Internal Server Error
        raise HTTPException(status_code=500, detail=str(e))
    
    
@app.get("/Permission-history/{userid}")
async def get_Permission_history(userid: str = Path(..., title="The ID of the user")):
    try:
        # Call your function to get the leave history for the specified user
        leave_history = Permission_History_Details(userid)

        # Return the leave history
        return {"leave_history": leave_history}
    except Exception as e:
        # If an exception occurs, return a 500 Internal Server Error
        raise HTTPException(status_code=500, detail=str(e))


@app.post('/autoClockout')
def auto_clockout(data: CT):
    total_hours_worked = Mongo.Clockout(userid=data.userid, name=data.name, time=data.time)
    return {"message": "Automatic clock out successful", "total_hours_worked": total_hours_worked}
