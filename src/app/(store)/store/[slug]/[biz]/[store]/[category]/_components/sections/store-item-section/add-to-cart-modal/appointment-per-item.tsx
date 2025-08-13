import { ShoppingCart } from "lucide-react";
import React from "react";

import Button from "@/components/global/buttons";

type Props = {
  onScheduleForLater: () => void;
};

const AppointmentPerItem = ({ onScheduleForLater }: Props) => {
  return (
    <div className="flex-between gap-4 border-t border-secondary-20 p-4">
      <Button
        variant="primary-outlined"
        stdHeight
        stdWidth
        onClick={onScheduleForLater}
      >
        Schedule for later
      </Button>
      <Button variant="primary" stdHeight stdWidth>
        <ShoppingCart size={20} className="!size-5" /> Book an appointment
      </Button>
    </div>
  );
};

export default AppointmentPerItem;
