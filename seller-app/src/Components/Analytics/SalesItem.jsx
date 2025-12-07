const SalesItem = ({ title, value }) => {
    return (
        <div className="bg-white p-4 flex justify-between items-center border-b">
            <div>
                <p className={`font-medium text-[#457b9d] `}>{title}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
                <span className="font-medium ">{value}</span>
            </div>
        </div>
    );
};

export default SalesItem;
