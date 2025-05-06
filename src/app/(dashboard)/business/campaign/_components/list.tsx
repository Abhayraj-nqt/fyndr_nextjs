import React from "react";

type ListProps<T> = {
  dataSource: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
};

const List = <T,>({ dataSource, renderItem }: ListProps<T>) => {
  return (
    <div className="flex flex-col gap-3">
      {dataSource.map((item, index) => (
        <React.Fragment key={index}>{renderItem(item, index)}</React.Fragment>
      ))}
    </div>
  );
};

export default List;
