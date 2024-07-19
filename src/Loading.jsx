import React, { useEffect, useState } from "react";

const Loading = ({ allModelsLoaded }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (allModelsLoaded) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [allModelsLoaded]);

  return (
    <>
      {visible && (
        <div className="loader-overlay">
          <div className="loader">
            <div className="center">
              <div className="spinner"></div>
            </div>
            <p>Next Weather</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
