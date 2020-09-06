import React, { useEffect } from 'react';
import initCanvas from '../../components/canvas';
import initAudio from '../../components/audio';
import sound from '../../assets/Space.mp3';

const Birthday = () => {
    useEffect(() => {
        initAudio();
        initCanvas();
    }, []);
    return (
    <div>
        <canvas />
        <audio src={sound}/>
    </div>
    );
};

export default Birthday;