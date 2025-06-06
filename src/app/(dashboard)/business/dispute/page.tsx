import { onDisputeList } from "@/actions/dispute.action";
import ContainerWrapper from "@/components/global/ContainerWrapper";

import DisputeListTable from "./_components/dipsute-list-table";

const Dispute = async () => {
  const promises = Promise.all([
    onDisputeList({
      endDate: "",
      startDate: "",
      status: [],
    }),
  ]);

  return (
    <ContainerWrapper title="Offer Summary">
      <section className="mt-10">
        <DisputeListTable promises={promises} />
      </section>
    </ContainerWrapper>
  );
};

export default Dispute;
