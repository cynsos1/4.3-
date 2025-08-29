import { useEffect, useState } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState(() => {
    // load saved todos
    const raw = localStorage.getItem("todos");
    return raw ? JSON.parse(raw) : [];
  });

  // save whenever todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(e) {
    e.preventDefault();
    const name = text.trim();
    if (!name) return;
    setTodos((t) => [...t, { id: crypto.randomUUID(), name, done: false }]);
    setText("");
  }

  function toggleTodo(id) {
    setTodos((t) =>
      t.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  }

  function deleteTodo(id) {
    setTodos((t) => t.filter((item) => item.id !== id));
  }

  function clearAll() {
    if (confirm("Clear all todos?")) setTodos([]);
  }

  return (
    <div style={{ maxWidth: 520, margin: "40px auto", padding: 16 }}>
      <h1 style={{ textAlign: "center", marginBottom: 12 }}>
        Cynthia Sosa’s To-Do List ⭐
      </h1>

      <form
        onSubmit={addTodo}
        style={{ display: "flex", gap: 8, marginBottom: 16 }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task…"
          style={{
            flex: 1,
            padding: 10,
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #111",
            background: "#111",
            color: "#fff",
          }}
        >
          Add
        </button>
      </form>

      {todos.length === 0 ? (
        <p style={{ color: "#666" }}>No tasks yet. Add one above.</p>
      ) : (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "grid",
            gap: 8,
          }}
        >
          {todos.map((t) => (
            <li
              key={t.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: 10,
                border: "1px solid #eee",
                borderRadius: 10,
              }}
            >
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleTodo(t.id)}
                title="mark done"
              />
              <span
                style={{
                  flex: 1,
                  textDecoration: t.done ? "line-through" : "none",
                  color: t.done ? "#888" : "#111",
                }}
              >
                {t.name}
              </span>
              <button
                onClick={() => deleteTodo(t.id)}
                style={{
                  border: "1px solid #e11",
                  color: "#e11",
                  borderRadius: 8,
                  padding: "6px 10px",
                  background: "transparent",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      {todos.length > 0 && (
        <div
          style={{
            marginTop: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <small>
            {todos.filter((t) => !t.done).length} left / {todos.length} total
          </small>
          <button
            onClick={clearAll}
            style={{
              border: "1px solid #aaa",
              borderRadius: 8,
              padding: "6px 10px",
              background: "transparent",
            }}
          >
            Clear All
          </button>
        </div>
      )}

      {/* Footer with your name */}
      <footer style={{ marginTop: 30, textAlign: "center", color: "#666" }}>
        Built by Cynthia Sosa
      </footer>
    </div>
  );
}
