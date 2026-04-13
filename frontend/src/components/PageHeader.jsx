export default function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-6">

      {/* TITLE */}
      <h1 className="text-2xl md:text-3xl font-bold 
      text-white tracking-tight">
        {title}
      </h1>

      {/* SUBTITLE */}
      {subtitle && (
        <p className="text-gray-400 text-sm mt-1">
          {subtitle}
        </p>
      )}

      {/* DIVIDER LINE */}
      <div className="mt-4 h-[1px] bg-gradient-to-r 
      from-indigo-500/30 via-purple-500/20 to-transparent" />

    </div>
  );
}