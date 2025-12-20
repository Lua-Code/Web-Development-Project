function RecentOrderItem({ listing = "N/A", buyer = "N/A", price = 0, status = "Unknown" }) {
    const isPending = status.toLowerCase() === "pending";

    return (
        <div className="bg-white p-4 flex justify-between items-center border-b">
            <div>
                <p className="font-medium text-[#1D3557]">{listing}</p>
                <p className="text-sm text-gray-500 text-left">{buyer}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
                <span className={`px-3 py-1 rounded-full text-xs text-white ${isPending ? 'bg-[#E63946]' : 'bg-[#457B9D]'}`}>
                    {status}
                </span>
                <span className="font-medium text-[#E63946]">${price}</span>
            </div>
        </div>
    );
}

export default RecentOrderItem;