import { Form, Formik } from "formik";
import s from "./SearchPanel.module.css";
import TitleInput from "./TitleInput";
import { useSearchParams } from "react-router-dom";
import updateSearchParams from "../../utils/updateSearchParams";
import { useAppDispatch } from "../../hooks/reduxForTypeScript";
import { setFilterOptions } from "../../redux/recipes/slice";

const SearchPanel = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const initialValues = {
    title: searchParams.get("title"),
  };

  return (
    <div className={s.searchPanel}>
      <div className="container">
        <h1>Plan, Cook, and Share Your Flavor</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            updateSearchParams("title", values.title);
            dispatch(setFilterOptions({ title: values.title || undefined }));
          }}
        >
          <Form>
            <TitleInput />
            <button type="submit" className="buttonGeneric">
              Search
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default SearchPanel;
