import { useState } from "react";
import "./App.css";
import CanvasComponent from "./threejs/CanvasComponent";

import Model from "./threejs/Model";
import PlaneMap from "./threejs/PlaneMap";
import Spring from "./threejs/Spring";
import ThreejsComponent from "./threejs/ThreejsComponent";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

function App() {
  const [modelData, setModelData] = useState(null);
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        background:
          " linear-gradient(0deg, rgba(152,192,288,1) 0%, rgba(106,166,200,1) 35%, rgba(139,186,216,1) 100%)",
      }}
    >
      <CanvasComponent>
        <ThreejsComponent modelData={modelData} />
        <Model setModelData={setModelData} />
        <Spring />
        <EffectComposer>
          <Bloom
            luminanceThreshold={1}
            luminanceSmoothing={0.1}
            intensity={0.5}
          />
        </EffectComposer>
        {/* <PlaneMap /> */}
      </CanvasComponent>
    </div>
  );
}
//luminanceThreshold: 이 값은 밝기를 기준으로 블룸 효과를 적용할지 말지를 결정하는 임계값
//luminanceSmoothing: 이 값은 밝기 임계값의 스무딩 양을 제어합니다. 기본값은 1입니다. 값이 낮을수록 임계값 주변의 밝기 변화가 더 부드럽게 적용됩니다.
//ntensity: 블룸 효과의 강도를 설정합니다. 기본값은 1입니다. 값이 높을수록 블룸 효과가 더 강하게 나타납니다.

export default App;
