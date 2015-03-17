# CSBS

[Heroku link][heroku]

[heroku]: https://csbs.herokuapp.com/

## Minimum Viable Product
Computer Science BrainScape (NOT the final name) is a clone of Brainscape, a flashcard studying app,
with a focus on programming. Users can:

- [x] Create accounts
- [x] Create sessions (log in)
- [x] Create decks
- [x] Create flashcards (1 question and 1 answer) within a deck
- [x] View their decks
- [x] Tag decks with a subject
- [x] Study cards sequentially
- [ ] Study cards randomly. Depending on how a user rates the difficulty of a card it will appear
more or less often, or not at all.
- [x] Publish their decks for others to use and study, and view the public decks of other users.
- [ ] Set goals for themselves and track mastery, via a statistics model as well as receive site-based achievements.
- [x] Give entire site CSS makeover and jQueryUI

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Deck Creation (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be perform CRUD actions on decks via
a simple Rails HTML view. Users will only be able to view their own decks.

[Details][phase-one]

### Phase 2: CRUD flashcards and viewing decks (~2 days)
I will first create the back-end for flashcards (a resource that will belong to a deck), then add a
JSON API for these flashcards and their corresponding decks. On the front-end, Backbone structures
will be added to allow the user to view their flashcards sequentially. Users will also be able to
create new decks with their own flashcards. Finally, decks can be added to subjects, and subjects
can be added to topics. From this point on, a deck can ONLY be created within a topic, and a topic
can ONLY be created within a subject.

[Details][phase-two]

### Phase 3: Pseudo-Random flashcard studying (~1-2 day)
I will add functionality to decks where a user can study their cards in a random order mode.
When given a card, the user can rate how well they knew the answer to the card on a scale of 1 (very
difficult) to 5 (easy). The lower the number given (this will be stored for each flashcard, most
likely stored locally by Backbone then pushed to the DB at the end of the studying session), the
more likely the card will be to disappear. From the second time onwards when a user sees a given
card, they will also have the option to stop it from appearing. The study session will end when
either the user has told every card to stop appearing, or the user chooses to end the study session.
[Details][phase-three]

### Phase 4: Content Publishing (~1 days)
I will add public/private functionality for decks/topics/subjects. Users can set a deck, topic, or
subject to be public (they will be private by default), meaning that they can be accessed when
another user visits their profile page. Setting a topic to public will make all of its decks
public, and setting a subject to public will set all of its topics to public. Following this, any
contained deck or topic can be made private again. Lastly, Users can "star" a deck they like. The
cumulative "stars" for topics and subjects will be aggregated and displayed on the appropriate page.

[Details][phase-four]

### Phase 5: Progress Tracking (~2 days)
I'll will give users the ability to track their own progress. This will be done by tracking the
percentage of "5" rated cards across decks, topics, subjects, and the user's entire portfolio. Users
can also earn site-based achievements based on the amount of content they cover, and can set their
own goals. Progress will be displayed on the user's profile page, and users can pick which goals
they want to make public. For public goals, other users can leave encouraging/congratulatory messages.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Purchase premium decks/topics packaged into a subject curriculum.
- [ ] Receive reminders via (at a minimum) email.
- [ ] Filter out/prevent posting of negative or "troll" comments
- [ ] Dynamically generated multiple choice answers for a given correct syntax expression.
- [ ] Difficulty scaling for the above.
- [ ] Add images as questions and/or answers to flashcards.
- [ ] Dynamically generated feedback (i.e. highlight missing/extra characters)
- [ ] Add a chat functionality/message board to users to discuss topics.
- [ ] Allow for multiple choice answers to facilitate Trivia Crack-style gameplay

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
