import { StoreItem } from "@/types/api-response/catalogue.response";

import List from "../../../_components/list";
import ListItem from "../../_components/listItem";

type Props = {
  items: StoreItem[];
};

const ItemList = ({ items }: Props) => {
  return (
    <List
      dataSource={items}
      renderItem={(item, index) => <ListItem key={index} item={item} />}
    />
  );
};

export default ItemList;
