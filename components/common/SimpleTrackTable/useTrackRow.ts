import { EmbbedTrack, Track } from "@/app/types/model";
import useAlbumActions from "@/hooks/useAlbumActions";
import usePlaylistAction from "@/hooks/usePlaylistAction";
import { useMemo } from "react";

const useTrackRow = ({ track }: { track: Track | EmbbedTrack }) => {
  const {
    handleAddTracksToPlaylist,
    handleRemoveTracksFromPlaylist,
    getCurrrentPlaylistId,
  } = usePlaylistAction();

  const { handleRemoveTracksFromAlbums, getCurrentAlbumId } = useAlbumActions();

  const albumName = useMemo(() => {
    return track.albums && track.albums.length > 0
      ? track.albums[0].title
      : "-";
  }, [track.albums]);

  const handleAddToPlaylist = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleAddTracksToPlaylist({
      id: getCurrrentPlaylistId()!,
      trackIds: [track._id],
    });
  };

  const handleRemoveFromPlaylist = () => {
    handleRemoveTracksFromPlaylist({
      id: getCurrrentPlaylistId()!,
      trackIds: [track._id],
    });
  };

  const handleRemoveFromAlbum = () => {
    handleRemoveTracksFromAlbums({
      albumsIds: [getCurrentAlbumId()!],
      trackIds: [track._id],
    });
  };

  return {
    handleAddToPlaylist,
    handleRemoveFromPlaylist,
    handleRemoveFromAlbum,
    albumName,
  };
};
export default useTrackRow;
