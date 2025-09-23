"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface SurveyQuestion {
  id: number;
  question: string;
}

export default function ManageQuestions() {
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase.from("survey_questions").select("*").order("id", { ascending: true });
      if (error) {
        setError(error.message);
      } else {
        setQuestions(data || []);
      }
      setLoading(false);
    };
    fetchQuestions();
  }, []);

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    const { error } = await supabase.from("survey_questions").insert([{ question: newQuestion }]);
    if (error) {
      setError(error.message);
    } else {
      setNewQuestion("");
      setError("");
      setLoading(true);
      const { data } = await supabase.from("survey_questions").select("*").order("id", { ascending: true });
      setQuestions(data || []);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("survey_questions").delete().eq("id", id);
    if (error) {
      setError(error.message);
    } else {
      setQuestions(qs => qs.filter(q => q.id !== id));
    }
  };

  const handleEdit = (id: number, question: string) => {
    setEditId(id);
    setEditText(question);
  };

  const handleEditSave = async (id: number) => {
    if (!editText.trim()) return;
    const { error } = await supabase.from("survey_questions").update({ question: editText }).eq("id", id);
    if (error) {
      setError(error.message);
    } else {
      setQuestions(qs => qs.map(q => q.id === id ? { ...q, question: editText } : q));
      setEditId(null);
      setEditText("");
      setError("");
    }
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h2>Manage Survey Questions</h2>
      <form onSubmit={handleAddQuestion} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={newQuestion}
          onChange={e => setNewQuestion(e.target.value)}
          placeholder="New question"
          style={{ width: "300px", marginRight: "8px" }}
        />
        <button type="submit" disabled={loading}>Add Question</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : questions.length === 0 ? (
        <p>No questions found.</p>
      ) : (
        <ul>
          {questions.map(q => (
            <li key={q.id} style={{ marginBottom: "0.5rem" }}>
              {editId === q.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                    style={{ width: "300px", marginRight: "8px" }}
                  />
                  <button onClick={() => handleEditSave(q.id)} style={{ marginRight: "8px" }}>Save</button>
                  <button onClick={() => { setEditId(null); setEditText(""); }}>Cancel</button>
                </>
              ) : (
                <>
                  {q.question}
                  <button style={{ marginLeft: "1rem" }} onClick={() => handleEdit(q.id, q.question)}>Edit</button>
                  <button style={{ marginLeft: "8px" }} onClick={() => handleDelete(q.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
