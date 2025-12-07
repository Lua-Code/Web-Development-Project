function StatsCard({ line, value, red }) {
    return (
        <div className="flex justify-between py-2 text-sm border-b last:border-none">
            <span className="text-gray-500">{line}</span>
            <span className={red ? "text-[#E63946]" : "text-[#1D3557]"}>{value}</span>
        </div>
    );
}
export default StatsCard 