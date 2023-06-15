interface Room {
  _id: number;
  name: string;
  description: string;
}

interface Track {
  title: string;
  owner: string;
  genre: string;
  description: String;
  url: string;
  votes: number;
  userVotes: string[];
}

interface User {
  id: string;
  image: string;
  name: string;
  email: string;
  password: string;
}
