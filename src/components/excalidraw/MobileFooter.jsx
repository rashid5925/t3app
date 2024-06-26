import { useDevice, Footer } from "@excalidraw/excalidraw";
import CustomFooter from "@/components/excalidraw/CustomFooter";

const MobileFooter = ({
  excalidrawAPI
}) => {
  const device = useDevice();
  if (device.isMobile) {
    return (
      <Footer>
        <CustomFooter excalidrawAPI={excalidrawAPI} />
      </Footer>
    );
  }
  return null;
};
export default MobileFooter;
