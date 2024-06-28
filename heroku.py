from flask import Flask, request, jsonify
from twilio.twiml.messaging_response import MessagingResponse

app = Flask(__name__)

@app.route('/whatsapp', methods=['POST'])
def whatsapp():
    incoming_msg = request.values.get('Body', '').lower()
    response = MessagingResponse()
    msg = response.message()
    
    if incoming_msg == 'hi':
        msg.body('Hello! How can I help you?')
    elif incoming_msg == 'help':
        msg.body('Here are some commands you can use: Hi, Help')
    else:
        msg.body('Sorry, I did not understand that command.')

    return str(response)

if __name__ == '__main__':
    app.run(port=5000)
