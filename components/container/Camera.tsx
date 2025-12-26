"use client";

import { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function Camera() {
  const [qrResult, setQrResult] = useState<String | null>(null);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-72">
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={(result, error) => {
            if (result) {
              setQrResult(result.getText());
            }
          }}
        ></QrReader>
      </div>

      {qrResult && (
        <div className="p-3 bg-green-100 rounded">
          <strong>Result : {qrResult}</strong>
        </div>
      )}
    </div>
  );
}
