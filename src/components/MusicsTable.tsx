import { IoTimeOutline } from "react-icons/io5";
import { Song } from "../lib/data";
// Update the import path below if your playerStore file is in a different location or has a different name
import { usePlayerStore } from '../store/playerStore';

interface MusicsTableProps {
  songs: Song[];
  playlist: Song[]; // If playlist is not an array of Song, adjust the type accordingly
}

const MusicsTable = ({ songs, playlist }: MusicsTableProps) => {
  // These hooks will throw a TS error if setCurrentSong or setCurrentPlaylist are not defined in your store
  const setCurrentSong = usePlayerStore((state) => state.setCurrentSong);
  const setCurrentPlaylist = usePlayerStore((state) => state.setCurrentPlaylist);

  return (
    <table className="table-auto text-left min-w-full divide-y divide-gray-500/20">
      <thead>
        <tr className="text-zinc-400 text-sm">
          <th className="px-4 py-2 font-light">#</th>
          <th className="px-4 py-2 font-light">Title</th>
          <th className="px-4 py-2 font-light">Album</th>
          <th className="px-4 py-2 font-light">
            <IoTimeOutline size={24} />
          </th>
        </tr>
      </thead>
      <tbody>
        {/* Remove empty <tr> that causes a warning */}
        {songs.map((song, index) => (
          <tr
            key={song.id}
            onClick={() => {
              setCurrentSong(song);
              setCurrentPlaylist(playlist);
              console.log("Song clicked:", song.title); // Debug
            }}
            className="text-gray-300 text-sm font-light hover:bg-white/10 overflow-hidden transition duration-300 cursor-pointer"
          >
            <td className="px-4 py-2 rounded-tl-lg rounded-bl-lg w-5">
              {index + 1}
            </td>
            <td className="px-4 py-2 flex gap-3">
              <picture>
                <img
                  src={song.image}
                  alt={song.title}
                  className="w-11 h-11"
                />
              </picture>
              <div className="flex flex-col">
                <h3 className="text-white text-base font-normal">
                  {song.title}
                </h3>
                <span>{song.artists.join(", ")}</span>
              </div>
            </td>
            <td className="px-4 py-2">{song.album}</td>
            <td className="px-4 py-2 rounded-tr-lg rounded-br-lg">
              {song.duration}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MusicsTable;

