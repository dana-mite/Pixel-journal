import { useState } from "react";
import Card from "./components/Card";
import Button from "./components/Button";
import Input from "./components/Input";
import MoodButton from "./components/MoodButton";
import "./App.css";

function App() {
  interface Quest {
    id: number;
    text: string;
    isCompleted: boolean;
  }

  const [quests, setQuests] = useState<Quest[]>([]);
  const [inputValue, setInputValue] = useState("");

  function addQuest() {
    if (inputValue.trim() === "") return;

    const questObj = {
      id: Date.now(),
      text: inputValue,
      isCompleted: false,
    };

    setQuests([...quests, questObj]);
    setInputValue("");
  }

  function toggleQuest(id: number) {
    setQuests((quests) =>
      quests.map((quest) =>
        quest.id === id ? { ...quest, isCompleted: !quest.isCompleted } : quest,
      ),
    );
  }

  function removeQuest(id: number) {
    setQuests((quests) => quests.filter((quest) => quest.id !== id));
  }

  const completedQuestCount = quests.filter(
    (quest) => quest.isCompleted,
  ).length;
  const totalQuestCount = quests.length;

  const getMonday = (d: Date) => {
    const date = new Date(d);
    const day = date.getDay();
    // Adjust if it's Sunday (0), otherwise subtract day index and add 1
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  // Initialize state to this week's Monday
  const [currentWeekStart, setCurrentWeekStart] = useState(
    getMonday(new Date()),
  );

  const handlePrevWeek = () => {
    const prev = new Date(currentWeekStart);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeekStart(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(currentWeekStart);
    next.setDate(next.getDate() + 7);
    setCurrentWeekStart(next);
  };

  const formatWeekRange = (startDate: Date) => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 4); // Adds 4 days to get to Friday

    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
    };

    const startStr = startDate.toLocaleDateString("en-US", options);
    const endStr = endDate.toLocaleDateString("en-US", options);

    return `${startStr} - ${endStr}`;
  };

  const weekDays = Array.from({ length: 5 }, (_, index) => {
    const dayDate = new Date(currentWeekStart);
    dayDate.setDate(dayDate.getDate() + index);

    return {
      dayName: dayDate.toLocaleDateString("en-US", { weekday: "short" }),
      dateNum: dayDate.getDate(),
      dateStr: dayDate.toISOString().split("T")[0],
    };
  });

  const [dayIndex, setDayIndex] = useState(0);
  const [dayMoods, setDayMoods] = useState<{ [key: string]: string }>({});
  const activeDateStr = weekDays[dayIndex]?.dateStr;

  const handleMoodSelect = (emoji: string) => {
    if (!activeDateStr) return;
    setDayMoods((prevMoods) => ({
      ...prevMoods,
      [activeDateStr]: emoji, 
    }));
  }

  return (
    <>
      <header className="journal-header-section">
        <div className="header-title-container">
          <h1 className="journal-title">
            ── ⋆⋅☆⋅⋆ ──°❀⋆.ೃ࿔* Pixel Journal °❀⋆.ೃ࿔*── ⋆⋅☆⋅⋆ ──
          </h1>
          <p className="journal-subtitle">
            weekly to-dos ✿ moods ✿ daily notes ✿ recaps
          </p>
        </div>

        <div className="header-date-container">
          <button className="header-prev-button" onClick={handlePrevWeek}>
            &#9664; prev
          </button>

          <div className="date-display-box">
            {formatWeekRange(currentWeekStart)}
          </div>

          <button className="header-next-button" onClick={handleNextWeek}>
            next &#9654;
          </button>
        </div>
      </header>
      <main>
        <div className="top-cards">
          <section className="week-quests-section">
            <Card
              title={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%",
                    alignItems: "center",
                    boxSizing: "border-box",
                  }}
                >
                  <span>Weekly Quests</span>
                  <span className="quest-count">
                    {completedQuestCount}/{totalQuestCount}
                  </span>
                </div>
              }
            >
              <div className="outer-progress-bar">
                <div
                  className="inner-progress-bar"
                  style={{
                    width: `${(completedQuestCount / totalQuestCount) * 100 || 0}%`,
                  }}
                ></div>
              </div>
              <div className="quest-input-container">
                <Input
                  placeholder="add a quest.."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="quest-input"
                />
                <Button className="pixel-button" onClick={addQuest}>
                  + add
                </Button>
              </div>
              <div className="quest-list">
                {quests.map((quest) => (
                  <div key={quest.id} className="quest-item">
                    <input
                      type="checkbox"
                      className="pixel-checkbox"
                      checked={quest.isCompleted}
                      onChange={() => toggleQuest(quest.id)}
                    />
                    <span
                      className="quest-text"
                      style={{
                        textDecoration: quest.isCompleted
                          ? "line-through"
                          : "none",
                      }}
                    >
                      {quest.text}
                    </span>
                    <Button
                      className="remove-quest"
                      onClick={() => removeQuest(quest.id)}
                    >
                      X
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </section>
          <section className="daily-log-section">
            <Card title="Daily Log">
              <div className="day-selector">
                {weekDays.map((day, index) => (
                  <button
                    key={index}
                    className={`day-button ${dayIndex === index ? "active" : ""}`}
                    onClick={() => setDayIndex(index)}
                  >
                    <span className="day-name">{day.dayName}</span>
                    <span className="day-number">{day.dateNum}</span>
                    <span className="day-mood">{dayMoods[day.dateStr]}</span>
                  </button>
                ))}
              </div>
              <p style={{ fontSize: '9px', marginBottom: '5px', color: '#000' }}>mood today..</p>
              <div className="mood-button-container">
                <MoodButton
                  emoji="😄"
                  label="Great"
                  isActive={dayMoods[activeDateStr] === "😄"}
                  activeColor="#f3f03b"
                  onClick={() => handleMoodSelect("😄")}
                />
                <MoodButton
                  emoji="😊"
                  label="Good"
                  isActive={dayMoods[activeDateStr] === "😊"}
                  activeColor="#3bf3ac"
                  onClick={() => handleMoodSelect("😊")}
                />
                <MoodButton
                  emoji="😐"
                  label="Fine"
                  isActive={dayMoods[activeDateStr] === "😐"}
                  activeColor="#a645af"
                  onClick={() => handleMoodSelect("😐")}
                />
                <MoodButton
                  emoji="😠"
                  label="Angry"
                  isActive={dayMoods[activeDateStr] === "😠"}
                  activeColor="#f3663b"
                  onClick={() => handleMoodSelect("😠")}
                />
                <MoodButton
                  emoji="😢"
                  label="Sad"
                  isActive={dayMoods[activeDateStr] === "😢"}
                  activeColor="#3e3bf3"
                  onClick={() => handleMoodSelect("😢")}
                />
              </div>
              <div>
                <p style={{ fontSize: '9px', marginBottom: '5px', color: '#000' }}>what happened today?</p>
                <textarea className="daily-log-input" placeholder="today I..." />
              </div>
            </Card>
          </section>
        </div>
        <div className="bottom-cards">
          <section className="videos-section">
            <Card title="Photos & Videos"></Card>
          </section>
          <section className="weekly-recap-section">
            <Card title="Weekly Recap"></Card>
          </section>
        </div>
      </main>
    </>
  );
}

export default App;
