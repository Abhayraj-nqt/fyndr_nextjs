import React from "react";

import { api } from "@/lib/api";

const Filters = async () => {
  const { success, data: categories } = await api.categories.getAll();

  return (
    <main>
      <div className="">
        <h3>Type of deals</h3>
        <div className=""></div>
      </div>
      <div className="">
        <h3>Category</h3>
        <div className=""></div>
      </div>
    </main>
  );
};

export default Filters;
