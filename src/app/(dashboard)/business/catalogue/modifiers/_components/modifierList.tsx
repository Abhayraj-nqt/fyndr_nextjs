import { StoreModifier } from "@/types/api-response/catalogue.response";

import List from "../../../_components/list";
import ListItem from "../../_components/listItem";

type Props = {
  modifiers: StoreModifier[];
};

const ModifierList = ({ modifiers }: Props) => {
  return (
    <List
      dataSource={modifiers}
      renderItem={(item, index) => {
        const newItem = { ...item, name: item.modName };
        return <ListItem key={index} item={newItem} />;
      }}
    />
  );
};

export default ModifierList;
