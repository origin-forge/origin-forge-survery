import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { SurveyResponse } from "@/lib/supabase";

export default function SurveyResults() {
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResponses = async () => {
      const { data, error } = await supabase.from("survey_responses").select("*").order("created_at", { ascending: false });
      if (error) {
        setError(error.message);
      } else {
        setResponses(data || []);
      }
      setLoading(false);
    };
    fetchResponses();
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h2>Survey Results</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : responses.length === 0 ? (
        <p>No survey responses found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: "4px" }}>ID</th>
              <th style={{ border: "1px solid #ccc", padding: "4px" }}>Created At</th>
              <th style={{ border: "1px solid #ccc", padding: "4px" }}>Email</th>
              <th style={{ border: "1px solid #ccc", padding: "4px" }}>Platforms</th>
              <th style={{ border: "1px solid #ccc", padding: "4px" }}>Features</th>
              <th style={{ border: "1px solid #ccc", padding: "4px" }}>Thoughts</th>
            </tr>
          </thead>
          <tbody>
            {responses.map(r => (
              <tr key={r.id}>
                <td style={{ border: "1px solid #ccc", padding: "4px" }}>{r.id}</td>
                <td style={{ border: "1px solid #ccc", padding: "4px" }}>{r.created_at}</td>
                <td style={{ border: "1px solid #ccc", padding: "4px" }}>{r.email}</td>
                <td style={{ border: "1px solid #ccc", padding: "4px" }}>{Array.isArray(r.platforms) ? r.platforms.join(", ") : r.platforms}</td>
                <td style={{ border: "1px solid #ccc", padding: "4px" }}>{Array.isArray(r.features) ? r.features.join(", ") : r.features}</td>
                <td style={{ border: "1px solid #ccc", padding: "4px" }}>{r.thoughts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
