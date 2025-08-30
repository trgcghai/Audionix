import ErrorMessage from "@/components/common/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppDispatch } from "@/hooks/redux";
import { usePlayer } from "@/hooks/usePlayer";
import {
  closeQueueDrawer,
  useQueueDrawer,
} from "@/store/slices/queueDrawerSlice";
import { XIcon } from "lucide-react";
import { useMemo } from "react";
import TrackInfo from "./TrackInfo";

const QueueDrawer = () => {
  const dispatch = useAppDispatch();
  const { queue } = useQueueDrawer();
  const { currentTrack } = usePlayer();

  const handleCloseDrawer = () => {
    dispatch(closeQueueDrawer());
  };

  const nextPlayings = useMemo(
    () => queue.filter((track) => track._id !== currentTrack?._id),
    [currentTrack, queue],
  );

  const hasNextPlayings = useMemo(
    () => nextPlayings && nextPlayings.length > 0,
    [nextPlayings],
  );

  return (
    <Card className="mt-0 h-full">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <p className="text-lg">Your queue</p>
            <Button
              variant={"ghost"}
              size="icon"
              className="-mr-2 rounded-full p-2"
              onClick={handleCloseDrawer}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="mb-8">
          <p className="mb-2 text-lg font-semibold">Now playing</p>
          <TrackInfo active={true} track={currentTrack!} />
        </div>

        <div>
          <p className="mb-2 text-lg font-semibold">Next from your queue</p>
          {hasNextPlayings ? (
            <ScrollArea className="h-[530px] overflow-y-auto">
              <div className="space-y-6">
                {nextPlayings.map((track) => (
                  <TrackInfo key={track._id} track={track} showRemove />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <ErrorMessage
              severity="info"
              showIcon={false}
              message="No more tracks in the queue"
              variant="inline"
              className="text-base"
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default QueueDrawer;
