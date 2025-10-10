import { Account } from "@/app/types/model";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultipleSelector from "@/components/ui/MultipleSelector";
import formatStringCapital from "@/utils/formatStringCapital";
import { formatUploadTime } from "@/utils/formatUploadTime";

interface AccountTabProps {
  account: Account;
}

const AccountTab = ({ account }: AccountTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">First Name</Label>
        <Input value={account.firstName} disabled className="font-medium" />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Last Name</Label>
        <Input value={account.lastName} disabled className="font-medium" />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Email</Label>
        <Input value={account.email} disabled className="font-medium" />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Created At</Label>
        <Input
          value={formatUploadTime(account.createdAt)}
          disabled
          className="font-medium"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Last Updated</Label>
        <Input
          value={formatUploadTime(account.updatedAt)}
          disabled
          className="font-medium"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Roles</Label>
        <MultipleSelector
          value={account.role.map((role: string) => ({
            key: role,
            value: role,
            label: formatStringCapital(role),
          }))}
          disabled
          className="p-1.5"
          badgeClassName="rounded-full !bg-primary !text-white"
        />
      </div>
    </div>
  );
};

export default AccountTab;
