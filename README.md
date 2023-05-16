# BrainBeatsFM

## Project Pitch

### Music app (Sound-Drop) with the possibility of integrating Ai.

- Rooms that have different genres of ai-generated music.
- Users can enter into each room and listen to different genres of music.
- Users can possibly generate songs from within the app.

## Project Setup ToDo

- ~~Discuss how we will work in a team~~
- ~~Rules; Boundaries; Sprint times, schedules etc~~
- ~~Repo & File Structure (api / frontend)~~
- ~~Trello board setup~~
- ~~Dedicate time to re-visiting Acebook/React/anything that wasn’t clear in the previous project~~

- Diagrams/Figma

- Technologies that we will be using.

  - What will they require?
  - Resources on the technologies we will be using (Tailwind CSS, Music API, AI, Next.js, TypeScript)

- Requirements for the app

  - Accounts/Tokens?

- Mood Board (Figma)
  - Websites that look good.
  - Inspiration.

## MVP

Account Set Up

- So the user can sign up/in and have a profile that other users can see, e.g. in rooms etc.
- Their profile will allow them to vote on tracks within the rooms.
- Landing page that sends the user to a sign-up/in page.
  Sign-up page
- So that the user can sign-up
- Username, Picture, email and password.
  Sign-in page
- So that the user can sign-in
- Email and Password
  Log-out
- So the user can log-out.

NON-MVP FEATURES

- Over a set period of time, the most played tracks will be able put into a top tracks playlist.
- User can add tracks using AI.
- Users can favourite rooms.
- Comments in rooms.
- Look at users profile
  - Shows their liked songs.
  - Shows their name and picture.
  - Shows their favourite genres. (Possibly done on sign-up)
- Order the rooms in the feed depending on user preferences.
- Feed/Master room page.
- This is so the user can see all the rooms, and therefore, choose the genre of music they want to listen to.
  Room pages.
- Each room shows the list of tracks.
- Can change the order of the tracks by voting.
- Track that is at the top of the queue will play.

## Tech Stack

- React
- MERN
- Next.js
- Typescript
- Tailwind
- Integrate an AI?
- Jest (backend tests)
- Cypress (frontend test)

## And that's f\*\*king teamwork!!!

- Morning stand-up - 10:00 - 10:15
- Dinner/Lunch - 12:30 - 14:00
- Retro (sprints last 2 days) - 16:30 - 17:00
- Meetings whenever necessary

### TEAM/PERSONAL GOALS

#### TEAM

- Everyone should implement components on the app.
- Support each-other and make sure that no-one is left behind.
- Speak up when something doesn’t make sense.
- Explain what is happening when driving within a pair.
- Make sure that everyone has an understanding on the app.
- Leave comments for team members where possible.
- If work is completed out of hours, make sure that it is spoken about when back to work hours.
- Take breaks when stuck.

#### PERSONAL

JAY -

- Be capable of creating sections on the app solo.
- Have better understanding of the file structure.

JACK -

- Gain a better understanding of MongoDB.
- Create relationships between tables.
- Try new technologies, e.g. NextJS, TypeScript, Tailwind.

NOELIA -

- Gain more confidence in working in react.
- Be capable of creating sections on the app solo. - Better understanding of MongoDB

RICH -

- Write a unit test
- Write a feature test
- Handle a GET request
- Handle a POST request
- Alter the database
- Test Drive a new component
- Test Drive a new feature
- Create a 'simple' component
- Create a 'complex' component
- Get comfortable using git to create and manage branches

## useful commands

- To start MongoDB: "brew services start mongodb-community@5.0"

### api directory

- connect to the database (cloud): "JWT_SECRET=SUPER_SECRET npm run start"
- connect to the test database (local): "JWT_SECRET=SUPER_SECRET npm run start:test"
- run backend tests: "JWT_SECRET=SUPER_SECRET npm run test"

### frontend directory

- run frontend server on localhost: "JWT_SECRET=SUPER_SECRET npm run dev"
- run all cypress tests: "JWT_SECRET=SUPER_SECRET npm run test"
- run cypress component tests: "JWT_SECRET=SUPER_SECRET npm run test:unit"
- run cypress e2e tests: "JWT_SECRET=SUPER_SECRET npm run test:feature"
