import AccountTab from "@/app/(admin)/admin/management/accounts/components/detailAccountDialog/AccountTab";
import ArtistTab from "@/app/(admin)/admin/management/accounts/components/detailAccountDialog/ArtistTab";
import HeroSection from "@/app/(admin)/admin/management/accounts/components/detailAccountDialog/HeroSection";
import UserTab from "@/app/(admin)/admin/management/accounts/components/detailAccountDialog/UserTab";
import { AccountStatus } from "@/app/enums";
import { ApiErrorResponse } from "@/app/types/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch } from "@/hooks/redux";
import useAdminActions from "@/hooks/useAdminActions";
import { useGetArtistByIdQuery } from "@/services/artists/artistApi";
import { useGetUserByIdQuery } from "@/services/users/userApi";
import {
  setOpen,
  useDetailAccountSlice,
} from "@/store/slices/detailAccountSlice";
import formatStringCapital from "@/utils/formatStringCapital";
import { Power, PowerOff, Settings2 } from "lucide-react";
import Link from "next/link";

enum TabValues {
  ACCOUNT = "account",
  ARTIST = "artist",
  USER = "user",
}

const DetailAccountDialog = () => {
  const dispatch = useAppDispatch();
  const { isOpen, account } = useDetailAccountSlice();
  const { handleToggleActiveStatus } = useAdminActions();

  const {
    data: userData,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useGetUserByIdQuery(account?._id || "", {
    skip: !account?._id || !isOpen,
  });

  const {
    data: artistData,
    isLoading: isArtistLoading,
    isError: isArtistError,
    error: artistError,
  } = useGetArtistByIdQuery(account?._id || "", {
    skip: !account?._id || !isOpen || !(account?.role || []).includes("artist"),
  });

  const user = userData?.data;
  const artist = artistData?.data;
  const isArtist = (account?.role || []).includes("artist");

  if (!account) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => dispatch(setOpen({ isOpen: open }))}
    >
      <DialogContent className="!max-w-4xl !px-2">
        <ScrollArea className="h-[600px] px-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Account Details
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <HeroSection user={user} account={account} />

            <Separator />

            <Tabs defaultValue={TabValues.ACCOUNT} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value={TabValues.ACCOUNT}>
                  Account Information
                </TabsTrigger>
                {isArtist && (
                  <TabsTrigger value={TabValues.ARTIST}>
                    Artist Profile
                  </TabsTrigger>
                )}
                <TabsTrigger value={TabValues.USER}>User Profile</TabsTrigger>
              </TabsList>

              <TabsContent value={TabValues.ACCOUNT} className="space-y-4 pt-4">
                <AccountTab account={account} />
              </TabsContent>

              {isArtist && (
                <TabsContent
                  value={TabValues.ARTIST}
                  className="space-y-4 pt-4"
                >
                  <ArtistTab
                    artist={artist}
                    isLoading={isArtistLoading}
                    isError={isArtistError}
                    error={artistError as ApiErrorResponse}
                  />
                </TabsContent>
              )}

              <TabsContent value={TabValues.USER} className="space-y-4 pt-4">
                <UserTab
                  user={user}
                  isLoading={isUserLoading}
                  isError={isUserError}
                  error={userError as ApiErrorResponse}
                />
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => dispatch(setOpen({ isOpen: false }))}
                className="rounded-full"
              >
                Close
              </Button>

              <Link href={`./accounts/update/${account._id}`}>
                <Button className="rounded-full">
                  <Settings2 className="h-4 w-4" />
                  <span>Edit</span>
                </Button>
              </Link>

              <Button
                variant={account.isActivate ? "destructive" : "default"}
                className="rounded-full flex items-center gap-2"
                onClick={() => {
                  handleToggleActiveStatus(
                    [account._id],
                    account.isActivate
                      ? AccountStatus.DEACTIVATED
                      : AccountStatus.ACTIVATED,
                  );
                  dispatch(setOpen({ isOpen: false }));
                }}
              >
                {account.isActivate ? (
                  <PowerOff className="h-4 w-4" />
                ) : (
                  <Power className="h-4 w-4" />
                )}
                {formatStringCapital(
                  account.isActivate
                    ? AccountStatus.DEACTIVATED
                    : AccountStatus.ACTIVATED,
                )}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DetailAccountDialog;
