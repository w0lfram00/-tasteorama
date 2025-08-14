import clsx from "clsx";
import CreateRecipeForm from "../../components/CreateRecipeForm/CreateRecipeForm";
import s from "./CreateRecipePage.module.css";

const CreateRecipePage = () => {
  return (
    <div className={clsx("container", s.createPage)}>
      <h2>Add Recipe</h2>
      <CreateRecipeForm />
    </div>
  );
};

export default CreateRecipePage;
