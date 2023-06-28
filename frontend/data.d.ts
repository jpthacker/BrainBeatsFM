export interface Room {
  _id: number;
  name: string;
  description: string;
}

export interface Track {
  title: string;
  owner: string;
  genre: string;
  description: String;
  url: string;
  votes: number;
  userVotes: string[];
}

export interface User {
  id: string;
  image: string;
  name: string;
  email: string;
  password: string;
}
