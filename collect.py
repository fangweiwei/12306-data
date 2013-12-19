

from lib.spider_12306 import  Spider12306
from lib.proxy_list import  ProxyList

spider = Spider12306()

spider.init()

while True:
    if spider.validate(): break

stations = spider.fetch_stations()


station = stations[0]
print station
trains = spider.fetch_trains(station)
print trains[0]