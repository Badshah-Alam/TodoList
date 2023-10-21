import "./App.css";
import { useState } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    const obj = { id: Math.random(), name: input, edit: false };
    todoList.push(obj);
    setTodoList(todoList);
    setInput("");
  };

  const deletHandle = (id) => {
    const newArr = todoList.filter((object) => {
      return object.id !== id;
    });
    setTodoList(newArr);
  };

  const update = (id) => {
    const modified = todoList.map((item) => {
      return item.id === id ? { ...item, edit: false } : item;
    });

    setTodoList(modified);
  };

  

  const handleChanged = (id, value) => {
    const modifiedArray = todoList.map((item) => {
      return item.id === id ? { ...item, name: value } : item;
    });
    setTodoList(modifiedArray);
  };

  const editHandle = (id) => {
    const modified = todoList.map((item) => {
      if (item.id === id) {
        return { ...item, edit: true };
      }
      return item;
    });
    setTodoList(modified);
  };

  return (
    <div className="App">
      <div className="container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSubmit}>+OK</button>
      </div>
      
      <div>
        {todoList.map((item, i) => (
          <div className="showAllAction" key={item.id}>
            <div>{i + 1}</div>

            {item?.edit ? (
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleChanged(item.id, e.target.value)}
              />
            ) : (
              <div className="name">{item.name}</div>
            )}

            <div className="action">
              <div>
                {item?.edit ? (
                  <button className="update" onClick={() => update(item.id)}>update</button>
                ) : (
                  <button className="edit" onClick={() => editHandle(item.id)}>edit</button>
                )}
              </div>
              <button className="delete" onClick={() => deletHandle(item.id)}>delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
