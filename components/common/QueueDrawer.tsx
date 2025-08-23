import { useAppDispatch } from "@/hooks/redux";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { XIcon } from "lucide-react";
import TrackInfo from "./TrackInfo";
import { closeQueueDrawer } from "@/store/slices/queueDrawerSlice";

const QueueDrawer = () => {
  const dispatch = useAppDispatch();

  const handleCloseDrawer = () => {
    dispatch(closeQueueDrawer());
  };

  return (
    <Card className="mt-0 h-full">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <p>Your queue</p>
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
          <TrackInfo active={true} />
        </div>

        <div>
          <p className="mb-2 text-lg font-semibold">Next from your queue</p>
          <ScrollArea className="h-[530px] overflow-y-auto">
            <div className="space-y-6">
              {/* {[...mockTracks, ...mockTracks, ...mockTracks].map(
                (track, index) => (
                  <TrackInfo key={track._id + index} track={track} />
                ),
              )} */}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};
export default QueueDrawer;
