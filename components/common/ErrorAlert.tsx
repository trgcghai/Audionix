import { Alert, AlertDescription } from "@/components/ui/alert.tsx";
import { Button } from "@/components/ui/button.tsx";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorAlertProps {
  fileId?: string;
  handleRetry?: (fileId: string) => void;
  errorType?: "preview" | "download";
}

const ErrorAlert = ({
  fileId = "",
  handleRetry = () => {},
  errorType = "download",
}: ErrorAlertProps) => {
  if (errorType == "preview") {
    return (
      <Alert className="border-amber-200 bg-amber-50">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-700">
          File này không thể xem trước. Vui lòng tải xuống để xem nội dung.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="border-red-200 bg-red-50">
      <AlertCircle className="h-4 w-4 text-red-600" />
      <AlertDescription className="text-red-700">
        <div className="flex items-center justify-between">
          <span>
            Không thể tải file. Vui lòng kiểm tra kết nối mạng hoặc tải file
            xuống để xem.
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleRetry(fileId)}
            className="ml-2 border-red-300 text-red-600 hover:bg-red-50"
          >
            <RefreshCw className="mr-1 h-4 w-4" />
            Thử lại
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
};
export default ErrorAlert;
