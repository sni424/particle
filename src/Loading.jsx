import React, { useEffect, useState } from 'react';

const Loading = ({ isLoading }) => {
    const [visible, setVisible] = useState(isLoading);

    useEffect(() => {
        if (isLoading) {
            setVisible(true);
        } else {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    return (
        <div className={`loader-overlay ${visible ? 'visible' : 'hidden'}`}>
            <div className="loader">
                <div className="spinner"></div>
                <p>Next Step...</p>
            </div>
        </div>
    );
};

export default Loading;
