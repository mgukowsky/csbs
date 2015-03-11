# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

('a'..'z').each do |letter|
  u = User.new(username: (letter * 5), email: "#{letter}@#{letter}.com", password: (letter * 5))
  u.ensure_session_token
  u.save
  (1..10).each do |num|
    u.decks.create(title: "#{num}")
    u.decks.create(title: "#{num * 100}", is_private: false)
  end
end
