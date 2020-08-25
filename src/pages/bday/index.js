import React, { useEffect } from 'react';
import initCanvas from '../../components/canvas';

const Birthday = () => {
    useEffect(initCanvas, []);
    return (
        <canvas />
    )
};

export default Birthday;