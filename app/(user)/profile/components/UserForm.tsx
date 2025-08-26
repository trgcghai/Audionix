import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const UserForm = () => {
  return (
    <>
      <div className="flex items-center gap-6">
        <Avatar className="w-24 h-24 border-2 border-primary">
          <AvatarImage src="/diverse-user-profiles.png" />
          <AvatarFallback className="text-2xl bg-muted text-muted-foreground">
            JD
          </AvatarFallback>
        </Avatar>
        <div className="space-x-2">
          <Button variant="outline" size="sm">
            Change Photo
          </Button>
          <Button variant="ghost" size="sm" className="text-destructive">
            Remove Photo
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            defaultValue="John"
            className="bg-input border-border"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            defaultValue="Doe"
            className="bg-input border-border"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          defaultValue="john.doe@example.com"
          className="bg-input border-border"
        />
      </div>
      <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
        Save Changes
      </Button>
    </>
  );
};
export default UserForm;
