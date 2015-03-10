require 'rails_helper'

# RSpec.describe Deck, :type => :model do
#   pending "add some examples to (or delete) #{__FILE__}"
# end

describe Deck do
  subject { Deck.new(title: "blah",
                     owner_id: 1) }

  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:owner_id) }
  # it { should validate_inclusion_of(:is_private).in_array(%w(true)) }
  # it { should validate_uniqueness_of(:username) }
  # it { should validate_uniqueness_of(:email) }
  it { should belong_to(:user) }
end
