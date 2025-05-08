import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';
import '../../../styles/business/scan-page/scan-style.css';

const QRScannerPage = ({ onScan }: { onScan: (result: string) => void }) => {
    useEffect(() => {
        const scanner = new Html5QrcodeScanner('qr-reader', {
          fps: 10,
          qrbox: { width: 500, height: 500 },
        }, false);

    scanner.render(
      (decodedText) => {
        console.log(`QR Code scanned: ${decodedText}`);
        onScan(decodedText);
      },
      (error) => {
        console.error(`QR Code scan error: ${error}`);
      }
    );

    return () => {
      scanner.clear().catch((error) => {
        console.error('Failed to clear scanner: ', error);
      });
    };
  }, [onScan]);

  return (
    <div className='qr-scanner-container'>
      <div className='qr-scanner-box'>
        <h2 className='qr-scanner-title'>
          Scan Your QR Code
        </h2>
        <div id='qr-reader' className='qr-reader' />
      </div>
    </div>
  );
};

export default QRScannerPage;
