function StatsCard({ title, value, Icon, IconColor, CircleColor }) {
    return (
        <div className="bg-white rounded-xl p-6 flex flex-col items-start gap-15">
            
            <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: CircleColor }}
            >
                <Icon size={25} style={{ color: IconColor }} />
            </div>

            <p className="text-lg text-[#457b9d]">{title}</p>

            <p className="text-2xl font-semibold text-[#1D3557]">{value}</p>
        </div>
    );
}

export default StatsCard;
