function TopSellingProductItem({ title, sales, price }) {
    return (
        <div className="bg-white rounded-xl p-4 flex justify-between items-center">
            <div>
                <p className="font-medium text-[#1D3557]">{title}</p>
                <p className="text-sm text-gray-500 text-left">{sales} sales</p>
            </div>
            <span className="font-medium text-[#E63946]">${price}</span>
        </div>
    );
}

export default TopSellingProductItem;
