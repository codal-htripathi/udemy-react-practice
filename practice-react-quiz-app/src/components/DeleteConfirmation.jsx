import { useEffect } from "react";

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    const timer = setTimeout(onCancel, 5000);
    return () => clearTimeout(timer);
  }, [onCancel]);
}