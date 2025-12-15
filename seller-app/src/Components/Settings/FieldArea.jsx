function FieldArea({ label, value, editing }) {
    return (
        <div>
            <p className="text-sm font-medium text-[#1D3557] text-left">{label}</p>

            {!editing ? (<p className="mt-1 text-sm text-gray-600 text-left">{value}</p>) : 
            (
                <input
                    type="text"
                    defaultValue={value}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A8DADC] text-left"
                />
            )
            }
        </div>
    );
}
export default FieldArea 