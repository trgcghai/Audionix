import ArtistForm from "@/app/(artist-portal)/artist/profile/components/form/ArtistForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ArtistRegister = () => {
  return (
    <Card className="min-w-2xl bg-card rounded-lg">
      <CardHeader>
        <CardTitle>Artist Registration</CardTitle>
        <CardDescription>
          Register as an artist to start sharing your music.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ArtistForm
          showCancelButton={false}
          submitButtonProps={{
            className: "w-full rounded-md",
            text: "Register",
          }}
        />
      </CardContent>
    </Card>
  );
};
export default ArtistRegister;
