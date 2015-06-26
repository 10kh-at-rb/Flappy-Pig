class UsersScore < ActiveRecord::Base
  validates :name, :score, presence: true;
end
