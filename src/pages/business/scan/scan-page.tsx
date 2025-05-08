import QRScannerPage from "../../../components/business/scan-page/qr-page";

const ScanPage = () => {
    return <QRScannerPage onScan={(result: string) => console.log(result)} />;
  };
  
  export default ScanPage;
  