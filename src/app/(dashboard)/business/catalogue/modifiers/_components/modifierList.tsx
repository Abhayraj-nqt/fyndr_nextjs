"use client";

import { deleteModifier } from "@/actions/catalogue.actions";
import { StoreModifier } from "@/types/api-response/catalogue.response";

import List from "../../../_components/list";
import ListItem from "../../_components/listItem";

type Props = {
  modifiers: StoreModifier[];
  bizid: number;
};

const ModifierList = ({ modifiers, bizid }: Props) => {
  const handleDelete = async (objid: number) => {
    await deleteModifier({ objid, bizid });
  };

  return (
    <List
      dataSource={modifiers}
      renderItem={(item, index) => {
        const newItem = { ...item, name: item.modName };
        return (
          <ListItem
            key={index}
            item={newItem}
            deletePress={() => handleDelete(newItem.objid)}
          />
        );
      }}
    />
  );
};

export default ModifierList;
