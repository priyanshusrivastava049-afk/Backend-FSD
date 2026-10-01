import { useMemo, useState } from "react";

const notes = [
  {
    id: 1,
    title: "React Hooks",
    category: "Frontend",
    tags: ["hooks", "state", "useEffect"],
    content:
      "React hooks allow functional components to manage state and side effects cleanly using useState and useEffect.",
  },
  {
    id: 2,
    title: "Express.js Basics",
    category: "Backend",
    tags: ["api", "server", "routes"],
    content:
      "Express simplifies creating REST APIs with route handlers, middleware, and JSON responses for client requests.",
  },
  {
    id: 3,
    title: "JavaScript Array Methods",
    category: "Programming",
    tags: ["map", "filter", "reduce"],
    content:
      "Array methods such as map, filter, and reduce are essential for writing expressive and efficient JavaScript code.",
  },
  {
    id: 4,
    title: "Git Workflow",
    category: "Tools",
    tags: ["commit", "branch", "merge"],
    content:
      "A good Git workflow includes branching, committing changes, reviewing diffs, and merging feature work safely.",
  },
  {
    id: 5,
    title: "Database Design",
    category: "Database",
    tags: ["schema", "sql", "normalization"],
    content:
      "Proper database design includes clear schemas, relationships, and normalization to keep data consistent and scalable.",
  },
];

const App = () => {
  const [search, setSearch] = useState("");

  const filteredNotes = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return notes;
    }

    return notes.filter((note) => {
      const searchableText = [
        note.title,
        note.category,
        note.content,
        ...note.tags,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(keyword);
    });
  }, [search]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Knowledge Base</p>
          <h1>Notes Search App</h1>
        </div>

        <label className="search-box" htmlFor="note-search">
          <span aria-hidden="true">🔎</span>
          <input
            id="note-search"
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search notes, tags, or topics..."
          />
        </label>
      </header>

      <main className="notes-panel">
        <div className="summary-row">
          <p>
            Showing <strong>{filteredNotes.length}</strong> note
            {filteredNotes.length === 1 ? "" : "s"}
          </p>
        </div>

        {filteredNotes.length > 0 ? (
          <div className="notes-grid">
            {filteredNotes.map((note) => (
              <article key={note.id} className="note-card">
                <div className="note-header">
                  <span className="category-badge">{note.category}</span>
                  <span className="note-id">#{note.id}</span>
                </div>

                <h2>{note.title}</h2>
                <p className="note-content">{note.content}</p>

                <div className="tags">
                  {note.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h2>No matching notes found</h2>
            <p>Try another keyword like React, Git, or Express.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;