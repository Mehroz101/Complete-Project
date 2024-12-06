import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export const notifyPromise = (promise, messages) => {
//   toast.promise(promise, {
//     pending: messages.pending || "Loading...",
//     success: messages.success || "Success!",
//     error: messages.error || "Error occurred!",
//   });
// };

// Existing notify function
export const notify = (type, message) => {
  const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    case "warning":
      toast.warn(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    default:
      toast(message, options); // General notification
      break;
  }
};
