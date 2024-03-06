import "./App.css";
import Header from "./components/Header/Header";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
import JournalList from "./components/JournalList/JournalList";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import { useLocalStorage } from "./hooks/useLocalStorage.hook";
import { useState } from "react";

function mapItems(items) {
  if (!items) {
    return [];
  }
  return items.map((item) => ({ ...item, date: new Date(item.date) }));
}

function App() {
  const [items, setItems] = useLocalStorage("data");
  const [selectedItem, setSelectedItem] = useState({});

  const addItem = (item) => {
    if (!item.id) {
      setItems([
        ...mapItems(items),
        {
          text: item.text,
          title: item.title,
          date: new Date(item.date),
          id: items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1,
        },
      ]);
    } else {
      setItems([
        ...mapItems(items).map((it) => {
          if (it.id === item.id) {
            return { ...item };
          }
          return it;
        }),
      ]);
    }
  };

  return (
    <div className="app">
      <LeftPanel>
        <Header />
        <JournalAddButton />
        <JournalList items={mapItems(items)} setItem={setSelectedItem} />
      </LeftPanel>

      <Body>
        <JournalForm onSubmit={addItem} data={selectedItem} />
      </Body>
    </div>
  );
}

export default App;
