import { toast } from "react-toastify";

const errorToast = (message = "Operation failed") => {
  toast.error(message, {
    position: "top-right",
  });
};

export default errorToast;
