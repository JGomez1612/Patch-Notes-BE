# Gamelog App

## User Stories
# Priorities
- As a user, I want to create an account so I can have a personal profile.
- As a user, I want to sign in so I can access my account.
- As a user, I want to sign out so I can securely leave my session.
- As a user, I want to view all the reviews I’ve written so I can keep track of my activity.
- As a user, I want to post a review for a game so I can share my thoughts.

- As a user/guest, I want to view a catalog of games so I can browse available titles.
- As a user/guest, I want to view details for a specific game (title, genre, release date, description, etc.) so I can learn more about it.
- As a user/guest, I want to see all reviews for a specific game so I can read what others think.

- As a user I want to be able to display my past reviews
- As a user I want to be able create a list of games to play(?)

# Later Additions
- As a user/guest I want to be able to see any popular/trending games/reviews, whats coming soon
- As a user I would like to see game recommendations based on my gaming history
- As a user/guest I would like to see gaming related news, articles, events, etc.
- As a user I would like to be able to create lists of games to recommend to others.
    - "Top 10 Horror games for Spooktober"


## Types of Users
- User
- Guest

# User Routes
- POST create a user account
- POST login user
- GET Profile Info
- PUT Update user profile
- Delete User

# Game Routes
- GET all games
- GET game by id

# Review Routes
- POST create a review
- GET all reviews
- GET reviews by id
- GET review for a specific user
- DELETE a review
- PUT update a review

## Models/Schemas
- Users {id, username, email, password}
- Games {id, title, genre, releaseDate, image, description}
- Reviews {id, gameId, userId, rating, text, createdAt}