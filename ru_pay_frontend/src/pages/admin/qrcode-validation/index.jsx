import { Html5QrcodeScanner } from 'html5-qrcode';
import { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/lib/components/ui/alert-dialog";
import AdminService from "@/services/AdminService";
import { Toaster } from "@/lib/components/ui/toaster";
import { useToast } from "@/lib/components/ui/use-toast";

export default function QrCodeValidation() {
  const [scanResult, setScanResult] = useState(null);
  const [modalOpen, setModalOpen] = useState(false)
  const [ticketInfo, setTicketInfo] = useState({})
  const { toast } = useToast();


  useEffect(() => {
    openScanner()
  }, []);

  const openScanner = () => {
    const defaultCameraId = 'your_camera_id_here';

    const config = {
      qrbox: {
        width: 500,
        height: 500,
      },
      fps: 5,
      cameraId: defaultCameraId,
    };

    const scanner = new Html5QrcodeScanner('reader', config);

    scanner.render(success, error);

    return () => {
      scanner.clear();
    };
  }

  function success(result) {
    setScanResult(result);
    getInfoTicket(result)
    closeScanner(); 
    setModalOpen(true)
  }

  function error(err) {
    console.log(err);
  }

  function closeScanner() {
    const scannerContainer = document.getElementById('reader');
    if (scannerContainer) {
      scannerContainer.innerHTML = '';
    }
  }

  const getInfoTicket = async (result) => {
    try {
      const response = await AdminService.consultTicketById(result);
      setTicketInfo(response)
    console.log(response)
    } catch(error){
    }
  }

  const updateTicketStatusToInactive = async () => {
    try {
      console.log(ticketInfo.id)
      const response = await AdminService.updateTicketStatusToInactive(ticketInfo.id);
      console.log(response)
      openScanner()
      setModalOpen(false)
      showErrorMessage("success", "Ação realizada com sucesso!");
    } catch(error) {
      console.log(error)
    }
  }

  const showErrorMessage = (variant, message) => {
    toast({
      variant: variant,
      description: message,
    });
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold md:text-2xl">
          Validação de QRCode
        </h1>
      </div>
      <div className="justify-center rounded-lg border shadow-sm p-6">
        <div>
          <div className="flex flex-col items-center mt-4">
            <div className="w-full max-w-md">
              <div>
                <div id="reader"></div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <AlertDialog open={modalOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Informações do ticket lido:
                  </AlertDialogTitle>
                <div className='flex flex-col gap-4'>
                  <span> Preço: {ticketInfo.price} </span>
                  <span> Status: {ticketInfo.statusTicket} </span>
                  <span> Tipo Ticket: {ticketInfo.typeTicket} </span>
                </div>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => {
                    openScanner()
                    setModalOpen(false)
                    }}>
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={() => updateTicketStatusToInactive()}>
                    Marcar como utilizado
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Toaster />
        </div>
      </div>
    </main>
  );
}