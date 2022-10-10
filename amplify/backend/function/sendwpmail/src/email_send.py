import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email_send_config import *

def compose_msg(to_address, name, surl):
    # Create message container - the correct MIME type is multipart/alternative.
    msg = MIMEMultipart('alternative')
    msg['Subject'] = 'Whitepaper form Triadh digital'
    msg['From'] = "Triadh <"+FROM_ADDR+">"
    msg['To'] = ', '.join([to_address])
    msg['Cc'] = ', '.join(CC_ADDR)
    greeting = "Hi "+name+",\n\n"
    regards = "Regards,\n Triadh Digital."
    linktxt=  "Please click below to access your eBook.:\n\n"+surl+",\n"


    text = greeting + """
            Thank you for your interest in The Data Mesh ebook.\n
            """ + linktxt + regards
    
    print(text)
    # Record the MIME types of both parts - text/plain and text/html.
    body = MIMEText(text, 'plain')

    # Attach parts into message container.
    msg.attach(body)    
    return msg

class email_sender :
    def __init__(self):
        self.connection = None
        pass
    def connect(self):
        # Send the message via local SMTP server.
        self.connection = smtplib.SMTP(SMTP_SERVER, PORT_ADDRESS)
        # self.connection.set_debuglevel(1)
        self.connection.ehlo()
        self.connection.starttls()
        self.connection.login(FROM_ADDR, PASSWORD)
    def disconnect(self):
        self.connection.quit()    
    
    def send_email(self,to_address,msg):
        self.connection.sendmail(FROM_ADDR, [to_address]+CC_ADDR, msg.as_string())

