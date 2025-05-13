"use client";
import { CatalogueItem } from "@/types/api-response/catalogue.response";

import ListItem from "./listItem";
import List from "../../../_components/list";

type Props = {
  data: CatalogueItem[];
};

const Catalogue = ({ data }: Props) => {
  return (
    <>
      <List
        dataSource={data}
        renderItem={(item, index) => (
          <ListItem key={index} item={item} hideDelete={index === 0} />
        )}
      />
    </>
  );
};

export default Catalogue;
