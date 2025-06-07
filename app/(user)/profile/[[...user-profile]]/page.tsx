import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <div className="w-full max-w-5xl mx-auto px-4 py-8">
    <UserProfile path="/profile" routing="path" />
  </div>
);

export default UserProfilePage;
