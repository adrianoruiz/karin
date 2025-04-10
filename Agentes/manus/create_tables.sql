-- Oliver Tables
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT CHECK (priority IN ('Alta', 'Média', 'Baixa')),
  status TEXT CHECK (status IN ('Pendente', 'Em andamento', 'Concluída')),
  due_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE task_logs (
  id SERIAL PRIMARY KEY,
  task_id INTEGER REFERENCES tasks(id),
  status TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Amanda Tables
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  sub_category TEXT,
  sent_at TIMESTAMP,
  response TEXT,
  effectiveness INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE special_dates (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  date DATE NOT NULL,
  type TEXT NOT NULL,
  importance INTEGER CHECK (importance BETWEEN 1 AND 5),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE preferences (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  items TEXT[] NOT NULL,
  last_used TIMESTAMP,
  interest_level INTEGER CHECK (interest_level BETWEEN 1 AND 5),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
); 