import "./JournalAddButton.css";
import CardButton from "../CardButton/CardButton";

const JournalAddButton = ({ clearForm }) => {
  return (
    <CardButton className="journal-add" onClick={clearForm}>
      <img className="journal-add-img" src="./add.svg" alt="logo" />
      <span>Новое воспоминание</span>
    </CardButton>
  );
};

export default JournalAddButton;
