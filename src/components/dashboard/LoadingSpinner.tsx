interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = 'Carregando...' }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin border-t-blue-500" />
      <p className="mt-4 text-gray-600 text-sm font-medium">{message}</p>
    </div>
  );
}