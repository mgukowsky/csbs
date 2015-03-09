# Schema Information (Not final; draft)

## decks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
topic_id    | integer   | not_null, foreign key (references topics)
title       | string    | not null
private     | boolean   | not null, defaults to true

## deck_followings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
deck_id     | integer   | not null, foreign key (references decks)
follower_id | integer   | not_null, foreign key (references users)
starred     | boolean   | Set to true if the follower stars the deck. Aggregate starred data for decks/topics/subjects will be generated client-side (?)

## flashcards
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
deck_id     | integer   | not null, foreign key (references decks)
question    | text      | not null
answer      | text      | not null

## topics
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
subject_id  | integer   | not_null, foreign key (references subjects)
title       | string    | not null
private     | boolean   | not null, defaults to true

## topic_following (Only decks can be starred)
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
topic_id    | integer   | not null, foreign key (references topics)
follower_id | integer   | not_null, foreign key (references users)

## subjects
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
title       | string    | not null
private     | boolean   | not null, defaults to true

## topic_following (Only decks can be starred)
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
subject_id    | integer   | not null, foreign key (references topics)
follower_id | integer   | not_null, foreign key (references users)

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

## user_flashcard_rating
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
flashcard_id    | string    | not null
user_id         | string    | not null
rating          | string    | not null, in range 1-5
