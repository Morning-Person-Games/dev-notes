import { toast } from "react-toastify";
import CreationError from "./CreationError";

async function createNewCategory(token, newCategory, spaceID) {
  const notifID = toast.loading("Creating Category...");
  return fetch("/api/create/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      category: newCategory,
    }),
  })
    .then((data) => {
      return data.json();
    })
    .then((category) => {
      toast.update(notifID, {
        render: "Category created!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      return category;
    })
    .catch((err) => {
      console.log(
        "TopicEntry - createNewSolution error: " + JSON.stringify(err, null, 2)
      );
      toast.update(notifID, {
        render: (
          <CreationError
            title={"Issue creating new category. "}
            spaceID={spaceID}
          />
        ),
        type: "error",
        isLoading: false,
        autoClose: false,
      });
      return "error";
    });
}

export default createNewCategory;
