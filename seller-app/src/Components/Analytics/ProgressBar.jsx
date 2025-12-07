const ProgressBar = ({ percentage }) => {
    return (
        <div className="w-full bg-gray-200 h-4 rounded-full">
            <div
                className="bg-[#457b9d] h-4 rounded-full"
                style={{ width: `${percentage}%` }}
            />
        </div>
    );
};


export default ProgressBar