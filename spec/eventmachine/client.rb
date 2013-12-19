#!/usr/bin/env ruby

require 'rubygems'
require 'eventmachine'

module HttpHeaders
  def post_init
    send_data "GET /\r\n\r\n"
    @data = ""
  end

  def receive_data(data)
    puts data
    @data << data
    send_data 'haha'
  end

  def unbind
    puts 'unbind'
    EventMachine::stop_event_loop
  end
end

EventMachine::run do
  EventMachine::connect '127.0.0.1', 8080, HttpHeaders
end