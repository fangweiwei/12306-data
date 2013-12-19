# coding: utf8
import urllib2, cookielib, user_agent_list, pil, urllib, json, re, sys, gzip, StringIO

class Spider12306:
    def __init__(self):
        self.randCode = ''
        self.cookie = cookielib.CookieJar()
        self.opener = urllib2.build_opener(urllib2.HTTPCookieProcessor(self.cookie),urllib2.HTTPSHandler())
    def init(self):
        url = 'https://kyfw.12306.cn/otn/czxx/init'
        self.opener.addheaders = [
            ('Accept'          , '*/*'),
            ('Accept-Encoding' , 'gzip,deflate,sdch'),
            ('Accept-Language' , 'zh-CN,zh;q=0.8'),
            ('Accept-Charset'  , 'utf-8'),
            ('Connection'      , 'keep-alive'),
            ('Host'            , 'kyfw.12306.cn'),
            ('Referer'         , 'https://kyfw.12306.cn/otn/zzzcx/init'),
            ('User-Agent'      , user_agent_list.rand())
        ]
        data = self.opener.open(url).read()
        print(self.cookie)
    def validate(self):
        url = "https://kyfw.12306.cn/otn/passcodeNew/getPassCodeNew?module=login&rand=sjrand&0.34583947436565"
        data = self.opener.open(url).read()
        code = pil.guess(data)
        if len(code) != 4:  return None

        url = 'https://kyfw.12306.cn/otn/passcodeNew/checkRandCodeAnsyn'
        data = self.opener.open(url, urllib.urlencode({'randCode': code, 'rand': 'sjrand'}) ).read()
        ret = json.loads(data)['data'] == 'Y'
        self.randCode = code
        print(code)
        return ret
    def fetch_stations(self):
        url =u'https://kyfw.12306.cn/otn/resources/js/framework/station_name.js'
        resp = self.opener.open(url); data = resp.read()
        if resp.headers.dict['content-encoding'] == 'gzip':
            gz = gzip.GzipFile(fileobj = StringIO.StringIO(data))
            data = gz.read(); gz.close()
        strs = re.sub(';$','', re.sub('^var station_names \=\'', '', data)).split('@')
        stations = []; patterns = 'jp name code py jp id'.split(' ')
        for str in strs:
            if str.strip() != '': stations.append(  dict(zip(patterns, str.strip().split('|'))) )
        return stations
    def fetch_trains(self, train):
        name, code = train['name'], train['code']
        url = "https://kyfw.12306.cn/otn/czxx/query?train_start_date=2013-12-16&train_station_name=%s&train_station_code=%s&randCode=%s"%(name, code, self.randCode)
        print url
        data = self.opener.open(url).read()
        trains = json.loads(data)['data']['data']
        return trains