const prevPlayer = ({ songInfo, isPlaying, handlePlayPause, volume }) => {
  return (
    <div className="grid h-24 w-screen grid-cols-3 bg-gradient-to-b from-black to-gray-900 px-2 text-xs text-white sm:text-base md:px-8">
      {/* Left */}
      <div className="flex items-center space-x-4">
        <img className="hidden h-10 w-10 md:inline" src={songImgUrl} alt="" />
        <div className="">
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />
        {!isPlaying ? (
          <PlayIcon
            onClick={handlePlayPause}
            className="h-10 w-10 cursor-pointer"
          />
        ) : (
          <PauseIcon
            onClick={handlePlayPause}
            className="h-10 w-10 cursor-pointer"
          />
        )}
        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>

      {/* Right */}
      <div className="flex items-center justify-end space-x-3 md:space-x-4">
        <VolumeOffIcon
          className="button"
          onClick={() => volume > 0 && setVolume(volume - 10)}
        />
        <input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
        <VolumeUpIcon
          className="button"
          onClick={() =>
            volume > 90
              ? setVolume(100)
              : volume <= 90 && setVolume(volume + 10)
          }
        />
      </div>
    </div>
  )
}
