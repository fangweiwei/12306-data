require'httparty'
class StationCollect
  def self.run
    url = 'https://kyfw.12306.cn/otn/resources/js/framework/station_name.js'
    ssl_path = File.expand_path('../../config/srca.pem',__FILE__)

    response = HTTParty.get(url, ssl_ca_file: ssl_path)
    #puts response.body, response.code, response.message, response.headers.inspect
    stations_str = response.gsub(/^var station_names \=\'/,'').gsub(/\';$/,'')
    stations = stations_str.split('@').select{|s|s!=''}.map do |station_raw|
      pattens = %w(jp name code py jp id)
      station = station_raw.split('|').map.with_index { |s, i| [ pattens[i], s] }
      Hash[station]
    end
  end

end