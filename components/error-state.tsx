import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  action?: React.ReactNode;
}

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again later.",
  action,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-center max-w-md mb-4">
        {message}
      </p>
      {action}
    </div>
  );
}
