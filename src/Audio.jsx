import React, { useEffect, useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import spring from '/audio/spring.wav?url';
import autum from '/audio/autum.wav?url';
import winter from '/audio/winter.wav?url';

const audioSource = [spring, autum, winter];

const Audio = ({ step }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audioElement = document.getElementById('audio-element');
        audioElement.src = audioSource[step - 1];
        if (isPlaying) {
            audioElement.play().catch((error) => {
                console.error('Failed to play audio:', error);
            });
        } else {
            audioElement.pause();
        }
    }, [step, isPlaying]);

    const toggleAudio = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <>
            <audio id="audio-element" loop />
            <button className="audio-toggle-button" onClick={toggleAudio}>
                {isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
            </button>
        </>
    );
};

export default Audio;
