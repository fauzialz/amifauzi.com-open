import { Fragment, useEffect, useRef, useState } from "react";

interface MusicPlayerProps {
  play?: boolean;
}

const MusicPlayer = ({ play: playParent }: MusicPlayerProps) => {
  const [play, setPlay] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);

  const onPlay = async () => {
    if (!audio.current) return;
    await audio.current.play();
    setPlay(true);
  };

  const onPause = async () => {
    if (!audio.current) return;
    audio.current.pause();
    setPlay(false);
  };

  useEffect(() => {
    if (playParent) onPlay();
    else onPause();
  }, [playParent]);

  return (
    <Fragment>
      <audio controls ref={audio} loop hidden>
        <source src={"/wedding.mp3"} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <div className=" fixed bottom-0 right-0 mr-3 mb-3 md:mr-8 md:mb-8">
        <button
          className="rounded-full drop-shadow-md bg-[#CE7BB0] text-4xl w-9 h-9  md:w-11 md:h-11 flex items-center justify-center"
          onClick={() => {
            play ? onPause() : onPlay();
          }}
          aria-label="audio-control"
        >
          <i className={play ? "bx bx-pause" : "bx bx-play pl-1"} />
        </button>
      </div>
    </Fragment>
  );
};

export default MusicPlayer;
