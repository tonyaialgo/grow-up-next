"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { Dialog } from "./dialog";
import { Button } from "./button";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  danger?: boolean;
}

export function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "確認",
  danger = false,
}: ConfirmDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} title={title} size="sm">
      <div className="space-y-6">
        <div className="flex gap-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
              danger ? "bg-red-100" : "bg-primary-100"
            }`}
          >
            <AlertTriangle
              className={`w-6 h-6 ${danger ? "text-red-600" : "text-primary-600"}`}
            />
          </div>
          <p className="text-gray-600 pt-2">{message}</p>
        </div>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={onClose}>
            取消
          </Button>
          <Button
            variant={danger ? "danger" : "primary"}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "處理中..." : confirmLabel}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
