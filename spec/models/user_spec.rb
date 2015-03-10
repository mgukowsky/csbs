require 'rails_helper'

# RSpec.describe User, :type => :model do
#   pending "add some examples to (or delete) #{__FILE__}"
# end

describe User do
  subject { User.new(username: "blah",
                     email: "blah",
                     password: "blahblah" )}

  it { should validate_presence_of(:username) }
  it { should validate_presence_of(:email) }
  it { should validate_presence_of(:session_token) }
  it { should validate_uniqueness_of(:username) }
  it { should validate_uniqueness_of(:email) }
  it { should validate_length_of(:password).is_at_least(5) }
  it { should have_many(:decks) }
end
