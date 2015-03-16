# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

50.times do
  u = User.new(username: Faker::Name.name,
               email: Faker::Internet.email,
               password: "password")
  u.ensure_session_token
  u.save
  5.times do
    d = u.decks.create(title: Faker::Commerce.department)
    5.times do
      Flashcard.create(deck_id: d.id,
                       question: Faker::Lorem.sentence,
                       answer: Faker::Lorem.sentence)
    end
    d = u.decks.create(title: Faker::Commerce.department, is_private: false)
    5.times do
      Flashcard.create(deck_id: d.id,
                       question: Faker::Lorem.sentence,
                       answer: Faker::Lorem.sentence)
    end
  end
end
