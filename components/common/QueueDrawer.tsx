import { useAppDispatch } from "@/hooks/redux";
import { mockTracks } from "@/app/sampleData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { XIcon } from "lucide-react";
import TrackInfo from "./TrackInfo";
import { useMemo } from "react";
import { closeQueueDrawer } from "@/store/slices/queueDrawerSlice";

const QueueDrawer = () => {
  const dispatch = useAppDispatch();
  const activeTrack = useMemo(() => mockTracks[0], []);

  const handleCloseDrawer = () => {
    dispatch(closeQueueDrawer());
  };

  return (
    <Card className="h-full mt-1">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <p>Your queue</p>
            <Button
              variant={"ghost"}
              size="icon"
              className="rounded-full p-2 -mr-2"
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
          <TrackInfo track={activeTrack} active={true} />
        </div>

        <div>
          <p className="mb-2 text-lg font-semibold">Next from your queue</p>
          <ScrollArea className="overflow-y-auto h-[530px]">
            <div className="space-y-6">
              {[...mockTracks, ...mockTracks, ...mockTracks].map(
                (track, index) => (
                  <TrackInfo key={track.id + index} track={track} />
                )
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};
export default QueueDrawer;
