import InvoiceForm from "@/app/(dashboard)/business/_components/invoice-form/invoice-form";
import Invoicefooter from "@/components/global/invoice/invoice-footer";
import { Modal } from "@/components/global/modal";
import { fetchInvoice } from "@/types/api-response/transaction.response";

import Invoiceview from "./invoice-view";

type InvoiceModalProps = {
  visible: boolean;
  invoice: fetchInvoice[] | null;
  status: string | null;
  type: string | null;
  onClose: () => void;
};
const InvoiceModal: React.FC<InvoiceModalProps> = ({
  visible,
  invoice,
  status,
  type,
  onClose,
}) => {
  const renderContent = () => {
    if (!invoice || invoice.length === 0) {
      return null; // or show a loading/safe message
    }

    if (status !== "pending") {
      return <Invoiceview inv={invoice} type={type} />;
    }

    // if (status === "pending" && type === "payable") {
    //   return <InvoicePay inv={invoice} type={type} callback={closeAndReset} custom={false} />;
    // }

    if (
      status === "pending" &&
      type === "receivable" &&
      invoice[0]?.channel !== "catalog"
    ) {
      return <InvoiceForm inv={invoice} edit={false} />;
    }

    // if (status === "pending" && type === "receivable" && invoice?.channel === "catalog") {
    //   return <InvoiceCataloguePending inv={invoice} type={type} callback={closeAndReset} custom={false} />;
    // }

    return null;
  };

  return (
    <Modal
      title={
        status === "pending"
          ? type === "receivable"
            ? "Edit Invoice"
            : "Pay Invoice"
          : "Invoice Details"
      }
      open={visible}
      onOpenChange={(val) => {
        if (!val) onClose(); // when modal tries to close, call parent’s close handler
      }}
      footerContent={<Invoicefooter />}
      footerClassName="p-0"
      showFooter={true}
      bodyClassName="max-h-[80vh] overflow-y-scroll no-scrollbar"
    >
      {renderContent()}
    </Modal>
  );
};

export default InvoiceModal;
