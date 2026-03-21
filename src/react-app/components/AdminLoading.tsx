import { Loader } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-brand-beige flex items-center justify-center">
      <div className="text-center">
        <Loader className="w-12 h-12 text-brand-green animate-spin mx-auto mb-4" />
        <p className="text-brand-muted text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}
