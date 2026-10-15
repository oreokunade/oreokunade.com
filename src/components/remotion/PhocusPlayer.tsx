import React from 'react';
import { Player } from '@remotion/player';
import { PhocusComposition } from './PhocusDemo';

export const PhocusRemotionPlayer: React.FC = () => {
  return (
    <div className="w-full aspect-video relative bg-[#0c0d11] rounded-2xl md:rounded-[2rem] overflow-hidden border border-neutral-800 shadow-2xl">
      <Player
        component={PhocusComposition}
        durationInFrames={240}
        compositionWidth={1280}
        compositionHeight={720}
        fps={30}
        style={{
          width: '100%',
          height: '100%',
        }}
        autoPlay
        loop
        controls
      />
    </div>
  );
};
