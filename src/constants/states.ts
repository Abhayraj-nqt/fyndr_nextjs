import ROUTES from "./routes";

export const DEFAULT_EMPTY = {
  title: "No Data Found",
  message:
    "Looks like the database is taking a nap. Wake it up with some new entries.",
  button: {
    text: "Add Data",
    href: ROUTES.HOME,
  },
};

export const DEFAULT_ERROR = {
  title: "Something Went Wrong",
  message: "Even our code can have a bad day. Give it another shot.",
  button: {
    text: "Retry Request",
    href: ROUTES.HOME,
  },
};

export const EMPTY_CATEGORY = {
  title: "Ahh, No Categories Yet!",
  message:
    "The category board is empty. Maybe it’s waiting for your brilliant question to get things rolling",
};

export const EMPTY_WALLET_TRANSACTIONS = {
  title: "No Wallet Transactions Yet!",
  message:
    "Your wallet's still untouched — start exploring and make your first transaction today!",
};

// export const EMPTY_TAGS = {
//   title: "No Tags Found",
//   message: "The tag cloud is empty. Add some keywords to make it rain.",
//   button: {
//     text: "Create Tag",
//     href: ROUTES.TAGS,
//   },
// };

// export const EMPTY_COLLECTIONS = {
//   title: "Collections Are Empty",
//   message:
//     "Looks like you haven’t created any collections yet. Start curating something extraordinary today",
//   button: {
//     text: "Save to Collection",
//     href: ROUTES.COLLECTION,
//   },
// };
