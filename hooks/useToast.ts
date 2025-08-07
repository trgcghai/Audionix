// hooks/useToast.ts
import { useMemo } from "react";
import { Slide, toast, ToastOptions } from "react-toastify";
import { useTheme } from "next-themes";
import "react-toastify/dist/ReactToastify.css";

// Custom CSS cho react-toastify - thêm vào file CSS riêng
// Có thể đặt trong file styles/toast.css và import
/*
.Toastify__toast {
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
}

.Toastify__toast--success {
  background-color: var(--accent);
  color: var(--accent-foreground);
}

.Toastify__toast--error {
  background-color: var(--destructive);
  color: var(--destructive-foreground);
}

.Toastify__toast--info {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.Toastify__progress-bar--success {
  background-color: var(--accent-foreground);
}

.Toastify__progress-bar--error {
  background-color: var(--destructive-foreground);
}

.Toastify__progress-bar--info {
  background-color: var(--primary-foreground);
}
*/

const useToast = () => {
  const { theme } = useTheme();

  const baseConfig: ToastOptions = useMemo(() => {
    return {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      // Tự động áp dụng theme dựa trên theme hiện tại của ứng dụng
      theme: theme === "light" ? "light" : "dark",
      transition: Slide,
      // Thêm các style tùy chỉnh cho từng loại toast
      style: {
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow-md)",
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

  return { showToast };
};

export default useToast;
