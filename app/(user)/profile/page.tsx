import PasswordCard from "@/app/(user)/profile/components/PasswordCard";
import UserInformationCard from "@/app/(user)/profile/components/UserInformationCard";

const ProfilePage = () => {
  return (
    <div className="space-y-6">
      <UserInformationCard />

      <PasswordCard />
    </div>
  );
};

export default ProfilePage;
