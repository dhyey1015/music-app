"use client";

import { TriangleAlert } from "lucide-react";

interface ErrorMessageProps {
  msg: string;
}

export default function ShowErrorMessage({ msg }: ErrorMessageProps) {
  if (!msg) return null;

  return (
    <div className="bg-red-500 border text-white px-4 py-2 rounded-lg shadow-md mb-4 flex items-start space-x-2" role="alert">
      <TriangleAlert/>
      <span className="font-medium">{msg}</span>
    </div>
  );
}
