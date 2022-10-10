import json
from email_send import *
from urllib.parse import unquote
import json
import logging
import boto3
import botocore
from botocore.exceptions import ClientError

def create_presigned_url():
    # Generate a presigned URL for the S3 object
    bucketName = "triadhdigital-dev";
    value1="whitepaper/HeliosWhitepaper.pdf"
    
    s3_client = boto3.client('s3',region_name="us-east-1",config=boto3.session.Config(signature_version='s3v4',))
    try:
        response = s3_client.generate_presigned_url('get_object',
                                                    Params={'Bucket': bucketName,
                                                            'Key': value1},
                                                    ExpiresIn=10000)
    except Exception as e:
        print(e)
        logging.error(e)
        return "Error"
    # The response contains the presigned URL
    return response
    

   
def handler(event, context):
    print('received event:')
    print('received context:')
    print(context)
    print(event)
    es = email_sender()
    es.connect()
    
    surl = create_presigned_url()
    to_address = str(event['queryStringParameters']['email'])
    name =  unquote(str(event['queryStringParameters']['name']))
    #surl =  unquote(str(event['queryStringParameters']['surl']))
    title =  unquote(str(event['queryStringParameters']['title']))
    company =  unquote(str(event['queryStringParameters']['company']))
    phone =  unquote(str(event['queryStringParameters']['phone']))
    print(to_address)
    print(name)
    print(surl)
      
    msg = compose_msg(to_address,name,surl) 
    
    es.send_email(to_address,msg)

    es.disconnect()
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps('Hello from your new Amplify Python lambda!')
  }