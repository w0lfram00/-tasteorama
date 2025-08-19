import s from "./SearchPanel.module.css";
import updateSearchParams from "../../utils/updateSearchParams";
import { useAppDispatch } from "../../hooks/reduxForTypeScript";
import { setFilterOptions } from "../../redux/recipes/slice";
import { useEffect, useState } from "react";

interface Props {
  initialValues: { title: string };
}

const SearchPanel = ({ initialValues }: Props) => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState(initialValues.title || "");

  useEffect(() => {
    setTitle(initialValues.title || "");
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setFilterOptions({ title: title }));
    updateSearchParams("title", title);
  };

  return (
    <div className={s.searchPanel}>
      <div className="container">
        <h1>Plan, Cook, and Share Your Flavor</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Dish's Title"
            value={title}
            onChange={handleChange}
            onBlur={(e) => {
              updateSearchParams("title", e.target.value);
            }}
          />
          <button type="submit" className="buttonGeneric">
            Search
          </button>
        </form>

        {/* <Formik
          initialValues={{ title: titleValue }}
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
        </Formik> */}
      </div>
    </div>
  );
};

export default SearchPanel;
