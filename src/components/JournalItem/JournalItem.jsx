import "./JournalItem.css";

const JournalItem = () => {
  const title = "Lorem ipsum dolor sit amet.";
  const date = new Date();
  const text =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Similique consequatur autem enim amet consectetur, saepe iste ipsam odio a. Molestiae error non modi exercitationem cupiditate excepturi asperiores neque reiciendis. Quam minus reiciendis facilis, quas non optio voluptas nemo distinctio! Illum?";
  return (
    <div className="journal-item">
      <h2 className="journal-item__header">{title}</h2>
      <h2 className="journal-item__body">
        <div className="journal-item__date">{date.toDateString()}</div>
        <div className="journal-item__text">{text}</div>
      </h2>
    </div>
  );
};

export default JournalItem;
