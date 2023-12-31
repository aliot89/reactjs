import React, { useEffect } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { Box, Typography } from "@mui/material";

const Scanner = (props) => {
  const { scanner, scannerResult, setScannerResult } = props;

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("render", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 10,
      rememberLastUsedCamera: true,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    });
    scanner.render(success, error);
    function success(result) {
      scanner.clear();
      setScannerResult(result);
    }
    function error(err) {
      console.log(err);
    }
    // Clean up function
    return () => {
      scanner.clear();
    };
  }, [scannerResult, setScannerResult]);

  return (
    <>
      <Typography
        sx={{ fontSize: "14px", fontWeight: "500", marginBottom: "10px" }}
      >
        {scanner}
      </Typography>
      <Box component="div">
        {scannerResult ? <></> : <Box component="div" id="render"></Box>}
      </Box>
    </>
  );
};

export default Scanner;
