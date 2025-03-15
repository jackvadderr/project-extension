interface EventProgressBarProps {
    progress: number;
  }
  
  const EventProgressBar = ({ progress }: EventProgressBarProps) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
        <div
          className="bg-purple-600 h-2 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };
  
  export default EventProgressBar;
  