from twilio.rest import Client
import os

AUTH_TOKEN = os.environ['auth_token']
ACCOUNT_SID = os.environ['account_sid']

client = Client(ACCOUNT_SID, AUTH_TOKEN)

# message = client.messages.create(
#     to="+18648712004", 
#     from_="+18888419554",
#     body="Hello from Twilio")

# print(message.sid)

# def send_notification(to, body):
#     message = client.messages.create(
#         to=to,
#         from_="+18888419554",
#         body=body)
#     print("Notification sent to", to)
#     return message.sid


