import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { useEffect, useReducer, useRef } from "react";
import cn from "classnames";
import { INITIAL_STATE, formReducer } from "./JournalForm.state";
import Input from "../Input/Input";

const JournalForm = ({ onSubmit, data, onDelete }) => {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const textRef = useRef();

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title: {
        titleRef.current.focus();
        break;
      }
      case !isValid.text: {
        textRef.current.focus();
        break;
      }
      case !isValid.date: {
        dateRef.current.focus();
        break;
      }
    }
  };

  useEffect(() => {
    if (!data) {
      dispatchForm({ type: "CLEAR" });
    }
    dispatchForm({
      type: "SET_VALUE",
      payload: { ...data },
    });
  }, [data]);

  useEffect(() => {
    let timerId;
    if (!isValid.date || !isValid.text || !isValid.title) {
      focusError(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 2000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: "CLEAR" });
    }
  }, [isFormReadyToSubmit, values, onSubmit]);

  const onChange = (e) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { [e.target.name]: e.target.value },
    });
  };

  const addJournalItem = (event) => {
    event.preventDefault();
    dispatchForm({ type: "SUBMIT" });
  };

  const deleteJournalItem = () => {
    onDelete(data.id);
    dispatchForm({ type: "CLEAR" });
  };

  return (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      <div className={styles["form-row"]}>
        <Input
          type="text"
          name="title"
          appearence="title"
          isValid={isValid.title}
          ref={titleRef}
          value={values.title}
          onChange={onChange}
          placeholder="Заголовок"
        />
        {data?.id && (
          <button
            className={styles["delete"]}
            type="button"
            onClick={deleteJournalItem}
          >
            <img src="./remove.svg" alt="кнопка удалить" />
          </button>
        )}
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-label"]}>
          <img src="./calendar.svg" alt="иконка календаря" />
          <span>Дата</span>
        </label>
        <Input
          type="date"
          isValid={isValid.date}
          ref={dateRef}
          value={
            values.date ? new Date(values.date).toISOString().slice(0, 10) : ""
          }
          name="date"
          appearence="date"
          id="date"
          onChange={onChange}
        />
      </div>

      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-label"]}>
          <img src="./folder.svg" alt="иконка папки" />
          <span>Метки</span>
        </label>
        <Input
          value={values.tag}
          type="text"
          id="tag"
          name="tag"
          appearence="tag"
          onChange={onChange}
          placeholder="Метки"
        />
      </div>

      <textarea
        name="text"
        id=""
        ref={textRef}
        value={values.text}
        cols="30"
        rows="10"
        onChange={onChange}
        placeholder="Введите текст заметки"
        className={cn(styles["input"], {
          [styles["invalid"]]: !isValid.text,
        })}
      ></textarea>
      <Button>Сохранить</Button>
    </form>
  );
};

export default JournalForm;
