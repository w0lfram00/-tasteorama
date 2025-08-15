import clsx from "clsx";
import CreateRecipeForm from "../../components/CreateRecipeForm/CreateRecipeForm";
import s from "./CreateRecipePage.module.css";
import ScreenLoader from "../../components/ScreenLoader/ScreenLoader";
import { useAppSelector } from "../../hooks/reduxForTypeScript";
import { selectIsLoading } from "../../redux/recipes/selectors";

const CreateRecipePage = () => {
  const isLoading = useAppSelector(selectIsLoading);

  return (
    <div className={clsx("container", s.createPage)}>
      <h2>Add Recipe</h2>
      <CreateRecipeForm />
      {isLoading && <ScreenLoader />}
    </div>
  );
};

export default CreateRecipePage;
