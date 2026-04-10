export default function Column({ title, items, selected, onSelect }) {
  return (
    <div className="w-1/6 bg-[#111] border-r border-gray-800 p-3 overflow-y-auto">
      <h3 className="text-sm text-gray-400 mb-3">{title}</h3>

      {items.length === 0 && (
        <p className="text-gray-500 text-xs">Empty</p>
      )}

      {items.map((item) => (
        <div
          key={item}
          onClick={() => onSelect(item)}
          className={`p-2 rounded cursor-pointer text-sm transition ${
            selected === item
              ? "bg-indigo-500/30 text-white"
              : "text-gray-400 hover:bg-white/10"
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  );
}