import "./JournalAddButton.css";
import CardButton from "../CardButton/CardButton";

const JournalAddButton = () => {
  return (
    <CardButton className="journal-add">
      <img className="journal-add-img" src="./logo.svg" alt="logo" />
      <span>Новое воспоминание</span>
    </CardButton>
  );
};

export default JournalAddButton;
