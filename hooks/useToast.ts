import { useTheme } from "next-themes";
import { useMemo } from "react";
import { Slide, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useToast = () => {
  const { theme } = useTheme();

  const baseConfig: ToastOptions = useMemo(() => {
    return {
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme,
      transition: Slide,
      // Thêm các style tùy chỉnh cho từng loại toast
      style: {
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow-md)",
        color: "var(--foreground)",
      },
    };
  }, [theme]);

  // Style tùy chỉnh cho từng loại toast
  const style = {
    background: "var(--card)",
    color: "var(--card-foreground)",
  };

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info",
    config?: ToastOptions,
  ) => {
    switch (type) {
      case "success":
        toast.success(message, {
          ...baseConfig,
          ...config,
          style: { ...baseConfig.style, ...style, ...config?.style },
        });
        break;
      case "error":
        toast.error(message, {
          ...baseConfig,
          ...config,
          style: { ...baseConfig.style, ...style, ...config?.style },
        });
        break;
      case "info":
        toast.info(message, {
          ...baseConfig,
          ...config,
          style: { ...baseConfig.style, ...style, ...config?.style },
        });
        break;
      default:
        toast(message, { ...baseConfig, ...config });
    }
  };

  const showSuccessToast = (message: string, config?: ToastOptions) => {
    showToast(message, "success", config);
  };

  const showErrorToast = (message: string, config?: ToastOptions) => {
    showToast(message, "error", config);
  };

  const showInfoToast = (message: string, config?: ToastOptions) => {
    showToast(message, "info", config);
  };

  return { showSuccessToast, showErrorToast, showInfoToast };
};

export default useToast;
