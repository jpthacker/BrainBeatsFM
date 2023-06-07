import Profile from "@/components/Profile/Profile";

interface paramsProps {
  params: { user: string };
}

export default function UserPage({ params }: paramsProps) {
  return <Profile params={params}></Profile>;
}
