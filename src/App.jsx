import { useEffect, useState } from "react";
import "./App.css";
import CanvasComponent from "./threejs/CanvasComponent";
import Model from "./threejs/Model";
import Spring from "./threejs/Spring";
import ThreejsComponent from "./threejs/ThreejsComponent";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import SkyBox from "./threejs/SkyBox";
import Winter from "./threejs/Winter";
import Audio from "./Audio";
import Loading from "./Loading";
import Autum from "./threejs/Autum";
import Summer from "./threejs/Summer";

function App() {
  const [modelData, setModelData] = useState([]);
  const [step, setStep] = useState(1);
  const [allModelsLoaded, setAllModelsLoaded] = useState(false);

  useEffect(() => {
    if (modelData && modelData.length > 0) {
      const interval = setInterval(() => {
        setStep((prevStep) => (prevStep >= 4 ? 1 : prevStep + 1));
      }, 12000);
      // 컴포넌트 언마운트 시 인터벌 클리어
      return () => clearInterval(interval);
    }
  }, [modelData]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
    >
      <Loading allModelsLoaded={allModelsLoaded} />
      <CanvasComponent>
        <ThreejsComponent
          modelData={modelData}
          step={step}
          setAllModelsLoaded={setAllModelsLoaded}
        />
        <Model
          modelData={modelData}
          setModelData={setModelData}
          step={step}
          setAllModelsLoaded={setAllModelsLoaded}
        />
        {step === 1 && <Spring />}
        {step === 2 && <Summer />}
        {step === 3 && <Autum />}
        {step === 4 && <Winter />}

        <EffectComposer>
          <Bloom
            luminanceThreshold={1}
            luminanceSmoothing={0.1}
            intensity={0.5}
          />
        </EffectComposer>

        <SkyBox step={step} />
      </CanvasComponent>
      <Audio step={step} />
    </div>
  );
}

export default App;
