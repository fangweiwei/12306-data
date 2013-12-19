require'httparty'

url = 'https://kyfw.12306.cn/otn/czxx/init'
ssl_path = File.expand_path('../../config/srca.pem',__FILE__)
use_httpproxy = false
http_proxyaddr = '192.168.56.1'
http_proxyport = '8087'

headers = {
    'Accept'          => '*/*',
    'Accept-Encoding' => 'gzip,deflate,sdch',
    'Accept-Language' => 'zh-CN,zh;q=0.8',
    'Connection'      => 'keep-alive',
    'Host'            => 'kyfw.12306.cn',
    'Referer'         => 'https://kyfw.12306.cn/otn/zzzcx/init',
    'User-Agent'      => 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.66 Safari/537.36'
}

args = {ssl_ca_file: ssl_path, headers: headers}
args.merge!(http_proxyaddr: http_proxyaddr, http_proxyport: http_proxyport) if use_httpproxy

response = HTTParty.get(url, args)

@cookie = response.headers['Set-Cookie']
headers['Cookie'] = @cookie.gsub('Path=/otn, ','').gsub(/path\=\//, "_jc_save_toDate=2013-12-14; _jc_save_fromStation=%u5317%u4EAC%u5317%2CVAP; _jc_save_toStation=%u4E0A%u6D77%2CSHH; _jc_save_fromDate=2013-12-15; _jc_save_wfdc_flag=dc; _jc_save_czxxcx_toStation=%u798F%u5DDE%2CFZS; _jc_save_czxxcx_fromDate=2013-12-15")

headers['Referer'] = 'https://kyfw.12306.cn/otn/czxx/init'
url = "https://kyfw.12306.cn/otn/passcodeNew/getPassCodeNew?module=login&rand=sjrand&#{rand()}"
puts "GET: #{url}"
response = HTTParty.get(url, args)
#puts response.headers['Expires']
img_path = File.expand_path("../../images/tmp/#{rand(100)}.png",__FILE__)
puts img_path
File.binwrite(img_path,response.body)
code = (`python D:/KuaiPan/Projects/picture_jiangzao/pil.py #{img_path}`).strip!
puts(code)


#headers['Origin'] = 'https://kyfw.12306.cn'
#headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
#headers['X-Requested-With'] = 'XMLHttpRequest'
url = 'https://kyfw.12306.cn/otn/passcodeNew/checkRandCodeAnsyn'
response = HTTParty.post(url, args.merge(body: {randCode: code, rand: 'sjrand'}))
#puts response.body
puts JSON.parse(response.body)['data'] == 'Y'