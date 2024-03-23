import React from 'react';

const SpeechBubbleBottom = ({ text }: { text: String}) => (
    <div className="bg-black text-white rounded-lg p-1 relative border-2 border-black text-xs" style={{ transform: "translateY(2px)"}}>
      {text}
      <div className="absolute left-3 -bottom-4 transform -translate-y-1/2" style={{
        borderTop: '14px solid #000',
        borderLeft: '12px solid transparent',
        borderRight: '12px solid transparent',
         }}></div>
    </div>
);

export default SpeechBubbleBottom;
