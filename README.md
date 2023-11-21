# BrainBeatsFM

[![Video](https://img.youtube.com/vi/bZiBi7z_S54/maxresdefault.jpg)](https://www.youtube.com/watch?v=bZiBi7z_S54)

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

## useful commands

To start MongoDB:

- MAC: "brew services start mongodb-community@6.0"
- Windows: "sudo systemctl start mongod"

### api directory

- connect to the database (cloud): "JWT_SECRET=SUPER_SECRET npm run start"
- connect to the test database (local): "JWT_SECRET=SUPER_SECRET npm run serve:test"
- run backend tests: "JWT_SECRET=SUPER_SECRET npm run test"

### frontend directory

- run frontend server on localhost: "JWT_SECRET=SUPER_SECRET npm run dev"
- run all cypress tests: "JWT_SECRET=SUPER_SECRET npm run test"apt
- run cypress component tests: "JWT_SECRET=SUPER_SECRET npm run test:unit"
- run cypress e2e tests: "JWT_SECRET=SUPER_SECRET npm run test:feature"
