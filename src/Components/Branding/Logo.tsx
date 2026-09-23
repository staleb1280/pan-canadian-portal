export default function Logo({ className = "h-9" }: { className?: string }) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-auto"
        >
          <rect width="40" height="40" rx="10" fill="#0F172A" />
          <path
            d="M20 6L23.5 16.5L34 20L23.5 23.5L20 34L16.5 23.5L6 20L16.5 16.5L20 6Z"
            fill="url(#logo-gradient)"
          />
          <circle cx="20" cy="20" r="3" fill="#10B981" />
          <defs>
            <linearGradient
              id="logo-gradient"
              x1="6"
              y1="6"
              x2="34"
              y2="34"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#3B82F6" />
              <stop offset="1" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>
        <div className="flex flex-col">
          <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
            Invest<span className="text-emerald-400">North</span>
          </span>
          <span className="text-[10px] tracking-widest font-semibold text-slate-400 uppercase -mt-1">
            Canada
          </span>
        </div>
      </div>
    );
  }