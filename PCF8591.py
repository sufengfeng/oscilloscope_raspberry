# -*- coding:utf-8 -*-
#!/usr/bin/env python
#------------------------------------------------------
#
#       您可以使用下面语句将此脚本导入另一个脚本：
#           “import PCF8591 as ADC”                
#   
#   ADC.Setup(Address)  # 查询PCF8591的地址：“sudo i2cdetect -y 1”
# i2cdetect  is  a  userspace  program to scan an I2C bus for devices.
# It outputs a table with the list of detected devices on the specified bus.
#   ADC.read(channal)   # Channal范围从0到3 
#   ADC.write(Value)    # Value范围从0到255
#
#------------------------------------------------------
#SMBus (System Management Bus,系统管理总线) 
import smbus   #在程序中导入“smbus”模块
import time

# for RPI version 1, use "bus = smbus.SMBus(1)"
# 0 代表 /dev/i2c-0， 1 代表 /dev/i2c-1 ,具体看使用的树莓派那个I2C来决定
bus = smbus.SMBus(1)         #创建一个smbus实例
address=0
#在树莓派上查询PCF8591的地址：“sudo i2cdetect -y 1”
def setup(Addr):
    global address
    address = Addr
setup(0x48) 

class PCF8591:
    def __init(self):
        #在树莓派终端上使用命令“sudo i2cdetect -y 1”，查询出PCF8591的地址为0x48
        setup(0x48) 

    @staticmethod
    def read(chn): #channel
        global address
        if chn == 0:
            bus.write_byte(address,0x40)   #发送一个控制字节到设备
        if chn == 1:
            bus.write_byte(address,0x41)
        if chn == 2:
            bus.write_byte(address,0x42)
        if chn == 3:
            bus.write_byte(address,0x43)
        bus.read_byte(address)         # 从设备读取单个字节，而不指定设备寄存器。
        return bus.read_byte(address)  #返回某通道输入的模拟值A/D转换后的数字值
    @staticmethod
    def write(val):
        global address
        temp = val  # 将字符串值移动到temp
        temp = int(temp) # 将字符串改为整数类型
        # print temp to see on terminal else comment out
        bus.write_byte_data(address, 0x40, temp) 
        #写入字节数据，将数字值转化成模拟值从AOUT输出

tmpValue=0
if __name__ == "__main__":
    while True:
        print (' AIN0 = ', PCF8591.read(0))   #电位计模拟信号转化的数字值
        print (' AIN1 = ', PCF8591.read(1))   #光敏电阻模拟信号转化的数字
        print (' AIN2 = ', PCF8591.read(2))   #热敏电阻模拟信号转化的数字值
        print (' AIN3 = ', PCF8591.read(3))   #热敏电阻模拟信号转化的数字值
        tmpValue=tmpValue+1
        PCF8591.Write(tmpValue)
        time.sleep(1)
        
