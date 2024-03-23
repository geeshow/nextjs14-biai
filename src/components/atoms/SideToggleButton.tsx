import SpeechBubbleLeft from "@/components/atoms/SpeechBubbleLeft";

export default function SideToggleButton() {
  return (
      <>
        <button className="flex flex-col justify-center items-center h-12 w-8">
          <div
              className="h-4 w-1 rounded-full bg-gray-400 group-hover:bg-black transition duration-100 ease-out -translate-y-1 group-hover:rotate-12"
          ></div>
          <div
              className="h-4 w-1 rounded-full bg-gray-400 group-hover:bg-black transition duration-100 ease-out -translate-y-1.5 group-hover:-rotate-12"
          ></div>
        </button>
        <div className="ml-1 hidden group-hover:block">
          <SpeechBubbleLeft text="Close sidebar"/>
        </div>
      </>
  );
}
