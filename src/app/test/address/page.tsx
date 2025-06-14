import React from "react";

import {
  Address,
  formatLocationWithDistance,
  parseAddress,
} from "@/lib/utils/address";

const AddressPage = () => {
  const usAddress: Address = {
    addressLine1: "123 Main Street",
    addressLine2: "Apt 4B",
    city: "New York",
    state: "NY",
    postalCode: "10001",
    country: "United States",
    distance: 2.3,
  };

  const ukAddress: Address = {
    addressLine1: "10 Downing Street",
    city: "London",
    postalCode: "SW1A 2AA",
    country: "United Kingdom",
    distance: 15.7,
  };

  const internationalAddress: Address = {
    addressLine1: "1 Champs-Élysées",
    city: "Paris",
    postalCode: "75008",
    country: "France",
    distance: 5.2,
  };

  console.log("=== Universal Format - US Address ===");
  console.log(parseAddress(usAddress, { includeDistance: true }));

  console.log("\n=== Universal Format - UK Address ===");
  console.log(parseAddress(ukAddress, { includeDistance: true }));

  console.log("\n=== Universal Format - International Address ===");
  console.log(parseAddress(internationalAddress, { includeDistance: true }));

  console.log("\n=== Compact Format (Your Use Case) ===");
  console.log(formatLocationWithDistance(usAddress));
  console.log(formatLocationWithDistance(ukAddress));
  console.log(formatLocationWithDistance(internationalAddress));

  const ad = parseAddress(usAddress, {
    compactMode: true,
    includeDistance: true,
  }).formatted;
  console.log({ ad });

  return (
    <div className="flex flex-col gap-4">
      <p>{ad}</p>
    </div>
  );
};

export default AddressPage;
