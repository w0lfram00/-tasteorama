import { toast } from "react-toastify";

const successToast = (message = "Operation completed successfully") => {
  toast.success(message, {
    position: "top-right",
  });
};

export default successToast;
