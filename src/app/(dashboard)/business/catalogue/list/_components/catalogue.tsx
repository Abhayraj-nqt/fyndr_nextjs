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
          <ListItem
            key={index}
            item={item}
            deletePress={() => console.log("delete", item.name)}
            onClick={() => console.log("click", item.name)}
            onEditClick={() => console.log("edit", item.name)}
            onStoreUrlClick={() => console.log("url click", item.url)}
            hideDelete={index === 0}
          />
        )}
      />
    </>
  );
};

export default Catalogue;
