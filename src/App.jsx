import { useEffect, useState } from 'react';
import './App.css';
import CanvasComponent from './threejs/CanvasComponent';

import Model from './threejs/Model';
import Spring from './threejs/Spring';
import ThreejsComponent from './threejs/ThreejsComponent';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import SkyBox from './threejs/SkyBox';
import Winter from './threejs/Winter';
import Audio from './Audio';
import Loading from './Loading';
import Autum from './threejs/Autum';
import Summer from './threejs/Summer';

function App() {
    const [modelData, setModelData] = useState(null);
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setStep((prevStep) => (prevStep >= 4 ? 1 : prevStep + 1));
            setIsLoading(true); // Step 변경 시 로딩 상태로 설정
        }, 12000);

        // 컴포넌트 언마운트 시 인터벌 클리어
        return () => clearInterval(interval);
    }, []);
    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                position: 'relative',
            }}
        >
            <Loading isLoading={isLoading} />
            <CanvasComponent>
                <ThreejsComponent modelData={modelData} />
                <Model
                    isLoading={isLoading}
                    setModelData={setModelData}
                    step={step}
                    onLoad={() => setIsLoading(false)}
                />
                {step === 1 && <Spring />}
                {step === 2 && <Summer />}
                {step === 3 && <Autum />}
                {step === 4 && <Winter />}

                <EffectComposer>
                    <Bloom luminanceThreshold={1} luminanceSmoothing={0.1} intensity={0.5} />
                </EffectComposer>

                <SkyBox step={step} />
            </CanvasComponent>
            <Audio step={step} />
        </div>
    );
}
//luminanceThreshold: 이 값은 밝기를 기준으로 블룸 효과를 적용할지 말지를 결정하는 임계값
//luminanceSmoothing: 이 값은 밝기 임계값의 스무딩 양을 제어합니다. 기본값은 1입니다. 값이 낮을수록 임계값 주변의 밝기 변화가 더 부드럽게 적용됩니다.
//ntensity: 블룸 효과의 강도를 설정합니다. 기본값은 1입니다. 값이 높을수록 블룸 효과가 더 강하게 나타납니다.

export default App;
