import "./App.css";
import CanvasComponent from "./threejs/CanvasComponent";

import Model from "./threejs/Model";
import PlaneMap from "./threejs/PlaneMap";
import Spring from "./threejs/Spring";
import ThreejsComponent from "./threejs/ThreejsComponent";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

function App() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
    >
      <CanvasComponent>
        <ThreejsComponent />
        <Model />
        <Spring />
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={1} intensity={1} />
        </EffectComposer>
        {/* <PlaneMap /> */}
      </CanvasComponent>
    </div>
  );
}

export default App;
