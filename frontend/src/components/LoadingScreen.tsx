interface LoadingScreenProps {
  text?: string;
}

export default function LoadingScreen({ text = 'Generating historical world...' }: LoadingScreenProps) {
  return (
    <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center z-40">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm font-medium text-slate-200">{text}</p>
      </div>
    </div>
  );
}
