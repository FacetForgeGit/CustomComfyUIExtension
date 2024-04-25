import React, { useState } from 'react';
import './CollapsibleWindow.css';

const CollapsibleWindow = ({ title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sliders, setSliders] = useState([]);
  const [switches, setSwitches] = useState([]);
  const [imageInputs, setImageInputs] = useState([]);
  const [queueState, setQueueState] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  const addSlider = () => setSliders([...sliders, { name: '', min: 0, max: 100, step: 1, value: 50 }]);
  const addSwitch = () => setSwitches([...switches, { name: '', isOn: false }]);
  const addImageInput = () => setImageInputs([...imageInputs, { name: '', src: '', alt: '' }]);
  const toggleQueue = () => setQueueState(!queueState);

  return (
    <div className={`collapsible-window ${isOpen ? 'open' : ''}`}>
      <button className="toggle-button" onClick={toggleOpen}>
        {title}
      </button>
      {isOpen && (
        <div className="content">
          <button onClick={addSlider}>Add Slider</button>
          <button onClick={addSwitch}>Add Switch</button>
          <button onClick={addImageInput}>Add Image Input</button>
          <button onClick={toggleQueue}>{queueState ? 'Dequeue' : 'Queue'}</button>
          {sliders.map((slider, index) => (
            <div key={index}>
              <label>{slider.name}</label>
              <input
                type="range"
                min={slider.min}
                max={slider.max}
                step={slider.step}
                value={slider.value}
                onChange={(e) => {
                  const newSliders = [...sliders];
                  newSliders[index].value = e.target.value;
                  setSliders(newSliders);
                }}
              />
            </div>
          ))}
          {switches.map((switchItem, index) => (
            <div key={index}>
              <label>{switchItem.name}</label>
              <input
                type="checkbox"
                checked={switchItem.isOn}
                onChange={() => {
                  const newSwitches = [...switches];
                  newSwitches[index].isOn = !newSwitches[index].isOn;
                  setSwitches(newSwitches);
                }}
              />
            </div>
          ))}
          {imageInputs.map((imageInput, index) => (
            <div key={index}>
              <label>{imageInput.name}</label>
              <input
                type="file"
                onChange={(e) => {
                  const newImageInputs = [...imageInputs];
                  newImageInputs[index].src = URL.createObjectURL(e.target.files[0]);
                  setImageInputs(newImageInputs);
                }}
              />
              <img src={imageInput.src} alt={imageInput.alt} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CollapsibleWindow;
