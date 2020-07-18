import json


        
class MessageType:
    def __init__(self, messageID, CH00,CH01, CH02, CH03,  reverse):
        
        self.messageID = messageID
        self.CH00 = CH00
        self.CH01 = CH01
        self.CH02 = CH02
        self.CH03 = CH03
        self.reverse = reverse


def MessageType2dict(msg):
    return {
        'messageID': msg.messageID,
        'CH00': msg.CH00,
        'CH01': msg.CH01,
        'CH02': msg.CH02,
        'CH03': msg.CH03,
        
        'reverse': msg.reverse
    }


def dict2MessageType(d):
    return MessageType(d['messageID'],d['CH00'], d['CH01'], d['CH02'], d['CH03'], 
                       d['reverse'])


if __name__ == "__main__":
    try:
        print(1/0)
    except Exception as e:
        print(e)
    s = MessageType("132", "2", "3", "4", "5", "6")
    json_str = json.dumps(s, default=MessageType2dict)
    print(json_str)
    message = json.loads(json_str, object_hook=dict2MessageType)
    print(message.messageID)

