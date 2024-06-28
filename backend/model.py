from pydantic import BaseModel

class Item(BaseModel):
    email: str
    # password: str
    name: str
class Item2(BaseModel):
    email: str
    # password: str
    name:str

class Item(BaseModel):
    email: str
    password: str
    name: str
class Item2(BaseModel):
    email: str
    password: str

class Item3(BaseModel):
    id: str
    
class Item4(BaseModel):
    data: str 
    id:str
    filename:str
    
class Item5(BaseModel):
    client_name: str 
    email:str
    
class Csvadd(BaseModel):
    data :str
    name:str
    fileid:str

class Csvedit(BaseModel):
    data:str
    name:str
    id:int
    fileid:str

class Csvdel(BaseModel):
    id:int
    fileid:str

class CT(BaseModel):
    time:str
    name:str
    userid:str
    
class UserId(BaseModel):
    user_id: str

class Item6(BaseModel):
    userid: str
    employeeName: str
    time: str
    leaveType: str
    reason: str
    selectedDate: str
    requestDate: str 

class Item7(BaseModel):
    userid: str
    employeeName: str
    time: str
    leaveType: str
    reason: str
    selectedDate: str
    ToDate : str
    requestDate: str 
    
class Item8(BaseModel):
    userid: str
    employeeName: str
    time: str
    leaveType: str
    selectedDate: str
    requestDate: str 
    timeSlot :str 
    reason: str   

    
class RemoteWorkRequest(BaseModel):
    userid: str
    employeeName: str
    time: str
    fromDate: str
    toDate: str
    requestDate: str
    reason: str
   
class Settings(BaseModel):
    authjwt_secret_key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiJhZG1pbl9pZCIsInJvbGUiOiJhZG1pbiIsImV4cGlyZXMiOjE3MDk3MTM2NjEuMjc5ODk4NH0.DwYyZBkO20Kicz5vvqxpCrxZ7279uHRlLttNDBVO-_E"
    authjwt_algorithm: str = "HS256"   