import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import cn from "classname";

const INITIAL_STATE = {
  title: true,
  text: true,
  date: true,
};

const JournalForm = ({ onSubmit }) => {
  const [formValidateState, setFormValidateState] = useState(INITIAL_STATE);

  useEffect(() => {
    let timerId;
    if (
      !formValidateState.date ||
      !formValidateState.text ||
      !formValidateState.title
    ) {
      timerId = setTimeout(() => {
        setFormValidateState(INITIAL_STATE);
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [formValidateState]);

  const addJournalItem = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    let isFormValid = true;

    if (!formProps.title?.trim().length) {
      setFormValidateState((state) => ({ ...state, title: false }));
      isFormValid = false;
    } else {
      setFormValidateState((state) => ({ ...state, title: true }));
    }
    if (!formProps.text?.trim().length) {
      setFormValidateState((state) => ({ ...state, text: false }));
      isFormValid = false;
    } else {
      setFormValidateState((state) => ({ ...state, text: true }));
    }
    if (!formProps.date) {
      setFormValidateState((state) => ({ ...state, date: false }));
      isFormValid = false;
    } else {
      setFormValidateState((state) => ({ ...state, date: true }));
    }
    if (!isFormValid) {
      return;
    }
    onSubmit(formProps);
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      <div>
        <input
          type="text"
          name="title"
          placeholder="Заголовок"
          className={cn(styles["input-title"], {
            [styles["invalid"]]: !formValidateState.title,
          })}
        />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-label"]}>
          <img src="./calendar.svg" alt="иконка календаря" />
          <span>Дата</span>
        </label>
        <input
          type="date"
          name="date"
          id="date"
          className={cn(styles["input"], {
            [styles["invalid"]]: !formValidateState.date,
          })}
        />
      </div>

      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-label"]}>
          <img src="./folder.svg" alt="иконка папки" />
          <span>Метки</span>
        </label>
        <input
          type="text"
          id="tag"
          name="tag"
          placeholder="Метки"
          className={styles["input"]}
        />
      </div>

      <textarea
        name="text"
        id=""
        cols="30"
        rows="10"
        placeholder="Введите текст заметки"
        className={cn(styles["input"], {
          [styles["invalid"]]: !formValidateState.text,
        })}
      ></textarea>
      <Button text="Сохранить" />
    </form>
  );
};

export default JournalForm;
