

export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        className="w-8 h-8 text-primary-500"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M22 2L12 12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="currentColor"
        />
      </svg>
      <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 text-transparent bg-clip-text">
        Habitify
      </span>
    </div>
  );
};