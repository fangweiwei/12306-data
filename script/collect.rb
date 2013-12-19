require'../lib/station_collect'
require'../lib/train_collect'
require 'thread/pool'

pool = Thread.pool(1)

stations = StationCollect.run


stations.each do |station|
  pool.process {
    trains   = TrainCollect.run(station)
    puts trains[0]
  }
end

pool.shutdown
