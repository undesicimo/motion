import { useRef, useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";

function App() {
  const [currentAnimation, setCurrentAnimation] = useState("none");
  const [duration, setDuration] = useState(1000);
  const [easing, setEasing] = useState("ease");
  const [isInfinite, setIsInfinite] = useState(false);
  const animatedElementRef = useRef<HTMLDivElement>(null);

  const animations = {
    none: {},
    fade: { opacity: [0, 1] },
    slide: { transform: ["translateX(-100px)", "translateX(0)"] },
    rotate: { transform: ["rotate(0deg)", "rotate(360deg)"] },
    scale: { transform: ["scale(0.5)", "scale(1)"] },
    bounce: {
      transform: [
        "translateY(0)",
        "translateY(-30px)",
        "translateY(0)",
        "translateY(-15px)",
        "translateY(0)",
      ],
    },
    shake: {
      transform: [
        "translateX(0)",
        "translateX(-10px)",
        "translateX(10px)",
        "translateX(-10px)",
        "translateX(0)",
      ],
    },
  };

  const playAnimation = () => {
    if (!animatedElementRef.current || currentAnimation === "none") return;

    animatedElementRef.current.animate(animations[currentAnimation as keyof typeof animations], {
      duration: duration,
      easing: easing,
      fill: "forwards",
      iterations: isInfinite ? Infinity : 1,
    });
  };

  return (
    <div className='max-w-3xl mx-auto p-8 text-center'>
      <h1 className='text-3xl font-bold mb-6'>Web Animation Playground</h1>

      <div className='bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md flex flex-col gap-4 mb-8'>
        <div className='flex items-center gap-4 justify-between'>
          <label className='text-left font-medium w-1/3'>Animation Type:</label>
          <select
            className='w-2/3 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700'
            value={currentAnimation}
            onChange={e => setCurrentAnimation(e.target.value)}>
            {Object.keys(animations).map(anim => (
              <option
                key={anim}
                value={anim}>
                {anim}
              </option>
            ))}
          </select>
        </div>

        <div className='flex items-center gap-4 justify-between'>
          <label className='text-left font-medium w-1/3'>Duration (ms):</label>
          <div className='w-2/3 flex items-center gap-2'>
            <input
              className='w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer'
              type='range'
              min='100'
              max='5000'
              step='100'
              value={duration}
              onChange={e => setDuration(Number(e.target.value))}
            />
            <span className='text-gray-700 dark:text-gray-300 w-16 text-right'>{duration}ms</span>
          </div>
        </div>

        <div className='flex items-center gap-4 justify-between'>
          <label className='text-left font-medium w-1/3'>Easing:</label>
          <select
            className='w-2/3 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700'
            value={easing}
            onChange={e => setEasing(e.target.value)}>
            <option value='linear'>linear</option>
            <option value='ease'>ease</option>
            <option value='ease-in'>ease-in</option>
            <option value='ease-out'>ease-out</option>
            <option value='ease-in-out'>ease-in-out</option>
            <option value='cubic-bezier(0.68, -0.55, 0.27, 1.55)'>bounce</option>
          </select>
        </div>

        <div className='flex items-center gap-4 justify-between'>
          <label className='text-left font-medium w-1/3'>Infinite Loop:</label>
          <div className='w-2/3 flex items-center gap-2 justify-start'>
            <input
              className='w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              type='checkbox'
              checked={isInfinite}
              onChange={e => setIsInfinite(e.target.checked)}
            />
            <span className='text-gray-700 dark:text-gray-300'>{isInfinite ? "On" : "Off"}</span>
          </div>
        </div>

        <button
          onClick={playAnimation}
          className='mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors'>
          Play Animation
        </button>
      </div>

      <div className='h-80 flex items-center justify-center my-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900'>
        <div
          className='p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md'
          ref={animatedElementRef}>
          <img
            src={reactLogo}
            className='h-24 p-6 transition-filter hover:drop-shadow-glow'
            alt='React logo'
          />
        </div>
      </div>

      <div className='mt-8 text-left bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto'>
        <h3 className='font-bold text-lg mb-2'>Animation Code:</h3>
        <pre className='whitespace-pre-wrap font-mono text-sm'>
          {`element.animate(
  ${JSON.stringify(animations[currentAnimation as keyof typeof animations] || {}, null, 2)},
  {
    duration: ${duration},
    easing: "${easing}",
    fill: "forwards",
    iterations: ${isInfinite ? "Infinity" : "1"}
  }
)`}
        </pre>
      </div>
    </div>
  );
}

export default App;
