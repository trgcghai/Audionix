import UserPopover from "@/components/header/UserPopover";
import { Button } from "@/components/ui/button";
import { useUserSlice } from "@/store/slices/userSlice";
import Link from "next/link";

const UserInfo = () => {
  const { isAuthenticated, user, roles } = useUserSlice();

  return (
    <>
      {!isAuthenticated && (
        <>
          <Link href="/auth/login">
            <Button variant="outline" className="rounded-full">
              Log In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="rounded-full">Register</Button>
          </Link>
        </>
      )}
      {isAuthenticated && user && <UserPopover user={user} roles={roles} />}
    </>
  );
};
export default UserInfo;
