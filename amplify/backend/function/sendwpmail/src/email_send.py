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
    linktxt = "Please click below to access your eBook.:\n\n"+surl+",\n"

    text = greeting + """
            Thank you for your interest in The Data Mesh ebook.\n
            """ + linktxt + regards
    BODY_HTML = """<div><table class="mktoModule desktopPad" id="spacerModule4cc6d2fb-f84c-47b5-80c0-de2839b7bda3" width="100%" height="35" border="0" cellpadding="0" cellspacing="0" style="min-width:100%;"> 
                    <tbody>

                    <tr></tr> 

                    <td class="centerImage" align="center" style="padding-left:40px; padding-right:40px; padding-top:25px; padding-bottom:25px; background-color:#ffffff;"> 
                    <div class="mktoText" > 
                    <a href="https://www.triadh.digital" alt="Triadh Digital" title="Triadh Digital"> <img align="center" src="https://media-exp1.licdn.com/dms/image/C4E0BAQFsdFgt78VV7Q/company-logo_200_200/0/1616173001405?e=1673481600&v=beta&t=1kKQ2bTNA2VXyanWPqJNMGUyWxkwLoXNCl9AI7qWFfc" alt="TriadhDigital" border="0" width="180" height="100" style="display:block; color:#0D9F98;"> </a> 
                    </div> </td> 
                    </tr> 
                    </tbody> 
                    </table>
                    <table class="mktoModule desktopPad" id="spacerModule4cc6d2fb-f84c-47b5-80c0-de2839b7bda3" width="100%" height="35" border="0" cellpadding="0" cellspacing="0" style="min-width:100%;"> 
                    <tbody> 
                    <tr> 
                    <td class="desktopPad" height="35" style="background-color:#ffffff; line-height:35px;font-size:35px;">&nbsp;</td> 
                    </tr> 
                    </tbody> 
                    </table>
                    <table class="mktoModule" id="h3833bc7b1-08bf-4a4d-b3c2-6525053cf030" width="100%" border="0" cellpadding="0" cellspacing="0" style="min-width:100%"> 
                    <tbody> 
                    <tr> 
                    <td class="stack" style="color: #1b3139;	font-family:	Arial, Helvetica, sans-serif; font-size: 28px;line-height: 36px;background-color:#ffffff; padding-left:40px; padding-right:40px;"> 
                    <div class="mktoText" id="titlePlaceholder833bc7b1-08bf-4a4d-b3c2-6525053cf030"> 
                    <div style="text-align: center;"> 
                    <span style="font-size: 24px;">Thank you for your interest in The Helios Data Mesh ebook.</span> 
                    </div> 
                    </div> </td> 
                    </tr> 
                    </tbody> 
                    </table>
                    <table class="mktoModule desktopPad" id="spacerModule4cc6d2fb-f84c-47b5-80c0-de2839b7bda3dd485eea-d7be-4d48-9262-1bff755cdf8e" width="100%" height="35" border="0" cellpadding="0" cellspacing="0" style="min-width:100%;"> 
                    <tbody> 
                    <tr> 
                    <td class="desktopPad" height="35" style="background-color:#ffffff; line-height:35px;font-size:35px;">&nbsp;</td> 
                    </tr> 
                    </tbody> 
                    </table>
                    <table class="mktoModule" id="mainCopyc2d097f1-d84e-4c0a-bc5e-ce57c986a19f" width="100%" border="0" cellpadding="0" cellspacing="0" style="min-width:100%;"> 
                    <tbody> 
                    <tr> 
                    <td class="stack" style="font-family: Arial, Helvetica, sans-serif; font-size:13px; line-height:20px; color:#0D9F98; padding-left:40px; padding-right:40px;background-color:#ffffff;"> 
                    <div class="mktoText" id="mainCopyCopyc2d097f1-d84e-4c0a-bc5e-ce57c986a19f"> 
                    <div style="text-align: center;">
                    Please click below to access your eBook. 
                    </div> 
                    </div> </td> 
                    </tr> 
                    </tbody> 
                    </table>
                    <table class="mktoModule desktopPad" id="spacerModule4cc6d2fb-f84c-47b5-80c0-de2839b7bda38d03b63f-434f-429a-9bce-d3b6b9d1fe5c" width="100%" height="35" border="0" cellpadding="0" cellspacing="0" style="min-width:100%;"> 
                    <tbody> 
                    <tr> 
                    <td class="desktopPad" height="35" style="background-color:#ffffff; line-height:35px;font-size:35px;">&nbsp;</td> 
                    </tr> 
                    </tbody> 
                    </table>
                    <table class="mktoModule" id="oneButtonCTAc039e444-7d98-4d11-ad75-f3af53bdf869" width="100%" border="0" cellpadding="0" cellspacing="0" style="min-width:100%;"> 
                    <tbody> 
                    <tr> 
                    <td class="stack" align="center" style="background-color:#ffffff; padding-left:40px; padding-right:40px;"> 
                    <table align="center" class="" border="0" cellspacing="0" cellpadding="0" bgcolor= "#0D9F98" width="205" style="border-radius:5px;"> 
                    <tbody> 
                    <tr> 
                    <td style="font-family: Arial, Helvetica, sans-serif;	font-size: 18px;	line-height: 20px;	text-align: center; padding-top:15px; padding-right:26px; padding-bottom:15px; padding-left:26px;color:#ffffff;"> 
                    <div class="mktoText" > 
                    <a href=\"""" + surl + """\" title="" style="color: #ffffff; text-decoration: none;">Download Now</a> 
                    </div> </td> 
                    </tr> 
                    </tbody> 
                    </table> </td> 
                    </tr> 
                    </tbody> 
                    </table>
                    <table class="mktoModule" id="persistentSpacerModuleff32aa99-e394-477a-a8e3-3432f8496733" width="100%" height="35" border="0" cellpadding="0" cellspacing="0" style="min-width:100%;"> 
                    <tbody> 
                    <tr> 
                    <td height="35" style="background-color:#ffffff; line-height:35px;font-size:35px;">&nbsp;</td> 
                    </tr> 
                    </tbody> 
                    </table>
                    <table class="mktoModule" id="ctatext22d78cf9-8ead-45a4-9c5b-f605d6226cd7" width="100%" border="0" cellpadding="0" cellspacing="0" style="min-width:100%;"> 
                    <tbody> 
                    <tr> 
                    <td class="stack" bgcolor="#ffffff" align="center" style="padding-left:40px; padding-right:40px;background-color:#ffffff;font-size:20px; line-height:24px; color:#0D9F98;font-family:Arial, Helvetica, sans-serif;"> 
                    <div class="mktoText" id="linktext5d98b0fb-0ec8-49e4-ae59-8bf2f0792178"> 
                    <div style="font-family: Arial, Helvetica, Calibri, sans-serif; font-size: 20px; letter-spacing: none; line-height: 1.4; text-align: center; color: #000000;"> 

                    </div> 
                    </div> </td> 
                    </tr> 
                    </tbody> 
                    </table>

                    <table class="mktoModule" id="mainCopyc2d097f1-d84e-4c0a-bc5e-ce57c986a19fdf651b2c-b4bf-4752-a90e-516f47cfef72" width="100%" border="0" cellpadding="0" cellspacing="0" style="min-width:100%;"> 
                    <tbody> 
                    <tr> 
                    <td class="stack" style="font-family: Arial, Helvetica, sans-serif; font-size:13px; line-height:20px; color:#1b3139; padding-left:40px; padding-right:40px;background-color:#ffffff;"> 
                    <div class="mktoText" id="mainCopyCopyc2d097f1-d84e-4c0a-bc5e-ce57c986a19fdf651b2c-b4bf-4752-a90e-516f47cfef72"> 
                    <div style="text-align: center;">
                    Let's keep the conversation going. 
                    </div> 
                    </div> </td> 
                    </tr> 
                    </tbody> 
                    </table>
                    </div>
                    """

    print(text)
    # Record the MIME types of both parts - text/plain and text/html.
    bodytxt = MIMEText(text, 'plain')
    bodyhtm = MIMEText(BODY_HTML, 'html')

    # Attach parts into message container.
    msg.attach(bodytxt)
    msg.attach(bodyhtm)
    return msg


class email_sender:
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

    def send_email(self, to_address, msg):
        self.connection.sendmail(
            FROM_ADDR, [to_address]+CC_ADDR, msg.as_string())
