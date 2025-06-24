import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";

export const PinningFunc = async (type, data, status, id) => {
  if (!id || !type || !data) {
    toast.error("Invalid data passed to pinning function.");
    return;
  }

  const collectionMap = {
    notes: "notes",
    project: "projects",
    blog: "blogs",
  };

  const collection = collectionMap[type];

  if (!collection) {
    toast.error("Unknown item type.");
    return;
  }

  try {
    const ref = doc(db, collection, id);
    await updateDoc(ref, { ...data, pinned: status });
    toast.success(`The ${type.charAt(0).toUpperCase() + type.slice(1)} is ${status ? "pinned" : "unpinned"} successfully.`);
  } catch (err) {
    console.error(err);
    toast.error(`Sorry, we couldn’t pin your ${type} right now.`);
  }
};
