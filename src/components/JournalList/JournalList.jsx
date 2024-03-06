import "./JournalList.css";
import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";

const JournalList = ({ items, setItem }) => {
  if (items.length === 0) {
    return <p>Воспоминаний нет</p>;
  }

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <div className="journal-list">
      {items.sort(sortItems).map((item) => {
        return (
          <CardButton key={item.id} onClick={() => setItem(item)}>
            <JournalItem title={item.title} text={item.text} date={item.date} />
          </CardButton>
        );
      })}
    </div>
  );
};

export default JournalList;
