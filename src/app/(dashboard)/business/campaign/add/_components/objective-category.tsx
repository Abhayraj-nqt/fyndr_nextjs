import Link from "next/link";
import { useEffect, useState } from "react";

import { onGetCategories } from "@/actions/category.action";
import DefaultCard from "@/components/global/cards/default-card";
import Select from "@/components/global/input/select/index";
import InfoTooltip from "@/components/global/tooltip/info-tooltip";

type CategoryOption = {
  value: string;
  label: string;
};

const ObjectiveCategory = () => {
  const [categoryList, setCategoryList] = useState<CategoryOption[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTags] = useState([]);
  const info = (
    <>
      You can manage tags from your profile section.{" "}
      <Link href="/business/profile" className="text-blue-600 underline">
        Click here
      </Link>
    </>
  );
  const CampaignGoal = [
    { label: "Maximize In-Store Sales", value: "Maximize In-Store Sales" },
    { label: "Maximize Online Sales", value: "Maximize Online Sales" },
    {
      label: "Maximize In-Store & Online Sales",
      value: "Maximize In-Store & Online Sales",
    },
  ];

  const fetchCampaign = async () => {
    const { success, data } = await onGetCategories();
    if (!success || !data) return null;
    const formattedList = data.map((row) => ({
      label: row.name,
      value: String(row.objid),
    }));
    setCategoryList(formattedList);
  };

  useEffect(() => {
    fetchCampaign();
  }, []);
  return (
    <>
      <DefaultCard className="flex-center m-4 min-h-[134px] w-full max-w-[772px] flex-col border-solid bg-white p-[23px] outline-black">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-6">
            <Select
              label="Objective"
              showRequired
              placeholder=""
              options={CampaignGoal}
              className="flex w-[350px] flex-row"
            />
            <Select
              label="Category"
              showRequired
              placeholder=""
              options={categoryList}
              value={selectedCategory}
              onValueChange={setSelectedCategory}
              className="flex w-[350px] flex-row"
            />
          </div>
          <div className="flex">
            <div className="flex w-[350px] flex-col">
              <span className="mb-2 flex flex-row items-center gap-1 text-xl font-medium text-primary">
                Tags <InfoTooltip>{info}</InfoTooltip>
              </span>
              <Select
                options={[]}
                placeholder=""
                value={selectedTags}
                // onValueChange={setSelectedTags}
                inputClassName="hover:bg-white"
                multi
              />
            </div>
          </div>
        </div>
      </DefaultCard>
    </>
  );
};

export default ObjectiveCategory;
