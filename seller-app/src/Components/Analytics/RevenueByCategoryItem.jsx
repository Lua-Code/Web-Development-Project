import ProgressBar from "./ProgressBar";

const RevenueByCategoryItem = ({ category, revenue, percentage }) => {
    return (
        <div className="bg-white p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <p className="font-medium text-[#457b9d]">{category}</p>
                <span className="font-medium">${revenue} ({percentage}%)</span>
            </div>
            <ProgressBar percentage={percentage} />
        </div>
    );
};

export default RevenueByCategoryItem;
