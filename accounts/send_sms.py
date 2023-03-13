from twilio.rest import Client
import os

TWILIO_AUTH_TOKEN = os.environ['TWILIO_AUTH_TOKEN']
TWILIO_ACCOUNT_SID = os.environ['TWILIO_ACCOUNT_SID']

client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

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
