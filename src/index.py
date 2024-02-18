def handler(event, context):
    print(event) 
    message = 'Hello from lambda function'
    res = {
        "statusCode": 200,
        "headers": {
            "Content-Type": "*/*"
        },
        "body": message
    }
    return res
