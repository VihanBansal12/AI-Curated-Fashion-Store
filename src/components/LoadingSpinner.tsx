interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  message?: string;
}

export default function LoadingSpinner({ size = 'medium', message }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className={`${sizeClasses[size]} border-2 border-gray-200 border-t-accent rounded-full animate-spin`} />
      {message && (
        <p className="text-body text-ui-gray text-center animate-pulse-soft">
          {message}
        </p>
      )}
    </div>
  );
}