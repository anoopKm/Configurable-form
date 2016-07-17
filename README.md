# Configurable Form with Plain Javascript

How to run this project<br />

Download the zip file at the location (parent folder) where you want have your project<br />
Extrat the zip file<br />
Open the extracted folder path in terminal and run follwing commands: <br />
(i) sudo npm install<br />
(ii) npm start<br />
(iii) Hit "http:http://0.0.0.0:3000/" on your browser<br />

General usage guide:<br />
1. First save the configurations from Admin Panel<br />
2. Without saving them User Panel is not allowed to use<br />
3. In the Admin panel set all the field rules also these rules also have validation check as well<br />
4. If we donot set any rules and save the configurations, default configuration rules will be applied<br />
5. Default configuration<br /><br /><br />
{
  "userName": {
    "maxLen": 10,
    "specialCharacterAllowed": "",
    "required": true,
    "errMsg": "Error in password field",
    "sucMsg": "success",
    "regx": {}
  },
  "password": {
    "minLen": 6,
    "maxLen": 12,
    "specialCharacterAllowed": "#@",
    "errMsg": "Error in password field",
    "sucMsg": "success",
    "regx": {}
  },
  "fullName": {
    "alphabetOnly": "a-zA-Z0-9",
    "oneSpaceAllowed": false,
    "maxLenlimit40": false,
    "errMsg": "Error in name field",
    "sucMsg": "success",
    "regx": {}
  },
  "date": {
    "format": "dd/mm/yyyy",
    "specailcharChange": false,
    "regx": {},
    "errMsg": "Error in date field",
    "sucMsg": "success"
  }
}
