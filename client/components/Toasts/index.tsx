import { toast } from "react-toastify";

export const showToastMessage = () => {
    toast.success('Success Notification !', {
        position: toast.POSITION.TOP_RIGHT
    });
  };
  