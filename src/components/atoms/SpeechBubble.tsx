import React from 'react';

const SpeechBubble = ({ text }: { text: String}) => (
    <div className="bg-black text-white rounded-lg p-2 relative border-0 text-sm" style={{ transform: "translateY(2px)"}}>
      {text}
      <div className="absolute top-1/2 -left-2 transform -translate-y-1/2" style={{
        borderTop: '10px solid transparent',
        borderBottom: '10px solid transparent',
        borderRight: '13px solid #000'
         }}></div>
    </div>
);

export default SpeechBubble;
