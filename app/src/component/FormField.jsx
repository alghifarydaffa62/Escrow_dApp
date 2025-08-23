
export default function FormField({ label, value, onChange, error, type="text" }) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">{label}</label>
            <input
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                className={`bg-[#192845] rounded-sm w-full h-8 p-2 border ${error ? "border-red-500" : "border-transparent"}`}
            />
            {error && <span className="text-red-400 text-sm">{error}</span>}
        </div>
  )
}