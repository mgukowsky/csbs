class User < ActiveRecord::Base
  validates :username, :email, :session_token, presence: true
  validates :password, length: { minimum: 5, allow_nil: true }
  validates :username, :email, uniqueness: true

  has_many(
    :decks,
    class_name: "Deck",
    primary_key: :id,
    foreign_key: :owner_id
  )

  def password
    @password
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end

  def self.find_by_credentials(user_params)
    user = User.find_by_email(user_params[:email])
    return nil unless user
    (user.is_password?(user_params[:password])) ? user : nil
  end
end
