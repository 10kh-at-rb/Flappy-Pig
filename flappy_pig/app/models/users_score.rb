class UsersScore < ActiveRecord::Base
  validates :name, :score, presence: true;
  validates :name, length: { maximum: 12, message: "must be < 13 letters" }
end
