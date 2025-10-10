import { AccountStatus, VerifyStatus } from "@/app/enums";
import { Account, User } from "@/app/types/model";
import { Badge } from "@/components/ui/badge";
import formatStringCapital from "@/utils/formatStringCapital";
import Image from "next/image";

interface HeroSectionProps {
  user: User | undefined;
  account: Account;
}

const HeroSection = ({ user, account }: HeroSectionProps) => {
  return (
    <div className="flex items-center gap-6">
      <div className="relative h-32 w-32">
        {user?.avatar && user?.avatar.length > 0 ? (
          <Image
            src={user?.avatar[0].url}
            alt={user?.username}
            fill
            className="object-cover rounded-full"
          />
        ) : (
          <div className="h-32 w-32 bg-muted rounded-full flex items-center justify-center">
            <span className="text-4xl font-semibold uppercase">
              {user?.username?.charAt(0) || "U"}
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 space-y-2 text-center sm:text-left">
        <div className="space-y-1">
          <h3 className="text-2xl font-bold">{user?.username}</h3>
          <h3 className="text-sm text-muted-foreground">{account.email}</h3>
        </div>

        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          <Badge
            variant={account.isActivate ? "default" : "destructive"}
            className="capitalize rounded-full"
          >
            {formatStringCapital(
              account.isActivate
                ? AccountStatus.ACTIVATED
                : AccountStatus.DEACTIVATED,
            )}
          </Badge>
          <Badge
            variant={account.isVerified ? "default" : "destructive"}
            className="capitalize rounded-full"
          >
            {formatStringCapital(
              account.isVerified
                ? VerifyStatus.VERIFIED
                : VerifyStatus.UNVERIFIED,
            )}
          </Badge>
          {account.role.map((role) => (
            <Badge
              key={role}
              variant="outline"
              className="capitalize rounded-full"
            >
              {role}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
