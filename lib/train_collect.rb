require'httparty'
class TrainCollect
  def self.get_args()
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
    args
  end
  def self.get_cookie(args)

    url = 'https://kyfw.12306.cn/otn/czxx/init'

    response = HTTParty.get(url, args)
    @cookie = response.headers['Set-Cookie']
    args[:headers]['Cookie'] = @cookie.gsub('Path=/otn, ','').gsub(/path\=\//, "_jc_save_toDate=2013-12-14; _jc_save_fromStation=%u5317%u4EAC%u5317%2CVAP; _jc_save_toStation=%u4E0A%u6D77%2CSHH; _jc_save_fromDate=2013-12-15; _jc_save_wfdc_flag=dc; _jc_save_czxxcx_toStation=%u798F%u5DDE%2CFZS; _jc_save_czxxcx_fromDate=2013-12-15")

    args[:headers]['Referer'] = 'https://kyfw.12306.cn/otn/czxx/init'

  end
  def self.guess_validcode(args)
    url = "https://kyfw.12306.cn/otn/passcodeNew/getPassCodeNew?module=login&rand=sjrand&#{rand()}"
    #puts "GET: #{url}"
    #puts args[:headers]
    response = HTTParty.get(url, args)
    #puts response.headers['Expires']
    img_path = File.expand_path("../../images/tmp/#{rand}.png",__FILE__)
    #puts response.body
    File.binwrite(img_path,response.body)
    puts img_path
    code = (`python D:/KuaiPan/Projects/picture_jiangzao/pil.py #{img_path}`).strip!

    return nil if code.length != 4
    print(code + " ")
#headers['Origin'] = 'https://kyfw.12306.cn'
#headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
#headers['X-Requested-With'] = 'XMLHttpRequest'
    url = 'https://kyfw.12306.cn/otn/passcodeNew/checkRandCodeAnsyn'
    response = HTTParty.post(url, args.merge(body: {randCode: code, rand: 'sjrand'}))
#puts response.body
#    puts JSON.parse(response.body)['data'] == 'Y'
    ret = JSON.parse(response.body)['data'] == 'Y'
    #print("\n") if ret
    ret ? code : nil
  end
  def self.run(station)

    args = self.get_args
    self.get_cookie(args)

    begin
      code = self.guess_validcode(args)
    end while(!code)

    self.get_trains(args, code,station)
  end

  def self.get_trains(args, code, station)
    url = "https://kyfw.12306.cn/otn/czxx/query?train_start_date=2013-12-16&train_station_name=#{URI.escape station['name']}&train_station_code=#{station['code']}&randCode=#{code}"
    #puts url
    response = HTTParty.get(url, args)
    trains = JSON.parse(response.body)['data']['data']
  end

end