import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function SubjectDetails() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [add, setAdd] = useState(false);
  const [newTopics, setNewTopics] = useState("");

  // EDIT MODAL STATES
  const [editMode, setEditMode] = useState(false);
  const [editTopicId, setEditTopicId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");

  const load = async () => {
    try {
      const r = await API.get(`/api/topics/bySubject/${id}`);
      setData(r.data);
    } catch (e) {
      toast.error("Failed loading topics");
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const saveNew = async () => {
  try {
    await API.post(`/api/topics/${id}/addTopic`, {
      topicName: newTopics
    });

    toast.success("Topics added successfully");
    setNewTopics("");
    setAdd(false);
    load();
  } catch (e) {
    console.error(e);
    toast.error("Error adding topics");
  }
};


  const completeTopic = async (topicId, checked) => {
    try {
      if (checked) {
        await API.put(`/api/topics/${topicId}/complete`);
      }
      toast.success("Updated");
      load();
    } catch (e) {
      toast.error("Update failed");
    }
  };

  // ------------------- OPEN EDIT MODAL -------------------
  const openEdit = (topic) => {
    setEditTopicId(topic.id);
    setEditName(topic.topicName);
    setEditDate(topic.scheduledDate);
    setEditTime(topic.scheduledTime);
    setEditMode(true);
  };

  // ------------------- SAVE EDIT ------------------------
  const saveEdit = async () => {
    try {
      await API.put(`/api/topics/${editTopicId}`, {
        topicName: editName,
        scheduledDate: editDate,
        scheduledTime: editTime
      });

      toast.success("Topic updated");
      setEditMode(false);
      load();
    } catch (e) {
      toast.error("Error updating topic");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-semibold">Topics</h2>
        <button className="btn-primary btn" onClick={() => setAdd(true)}>
          + Add Topics
        </button>
      </div>

      {data.length === 0 ? (
        <div className="card p-4 text-center">No topics</div>
      ) : (
        <div className="overflow-x-auto shadow rounded bg-white">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3 text-left">Topic</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3">Edit</th>
                <th className="p-3">Complete</th>
              </tr>
            </thead>

            <tbody>
              {data.map((t) => (
                <tr key={t.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{t.topicName}</td>
                  <td className="p-3">{t.scheduledDate}</td>
                  <td className="p-3">{t.scheduledTime}</td>

                  <td className="p-3">
                    {t.status === "COMPLETED" ? (
                      <span className="text-green-600 font-semibold">
                        Completed
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="p-3">
                    <button
                      className="text-blue-600 font-semibold underline"
                      onClick={() => openEdit(t)}
                    >
                      Edit
                    </button>
                  </td>

                  <td className="p-3 text-center">
                    <input
                      type="checkbox"
                      checked={t.status === "COMPLETED"}
                      onChange={(e) => completeTopic(t.id, e.target.checked)}
                      className="w-5 h-5 cursor-pointer accent-teal-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ADD TOPICS MODAL */}
      {add && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/30 p-4">
          <div className="card max-w-lg w-full bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-3">Add More Topics</h3>

            <textarea
              className="w-full border p-2 rounded"
              rows="3"
              placeholder="comma separated topics"
              value={newTopics}
              onChange={(e) => setNewTopics(e.target.value)}
            ></textarea>

            <div className="flex justify-end gap-2 mt-3">
              <button className="btn" onClick={() => setAdd(false)}>
                Cancel
              </button>
              <button className="btn-primary btn" onClick={saveNew}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT TOPIC MODAL */}
      {editMode && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/30 p-4">
          <div className="card max-w-lg w-full bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold mb-3">Edit Topic</h3>

            <input
              type="text"
              className="w-full border p-2 rounded mb-3"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
            />

            <input
              type="date"
              className="w-full border p-2 rounded mb-3"
              value={editDate}
              onChange={(e) => setEditDate(e.target.value)}
            />

            <input
              type="time"
              className="w-full border p-2 rounded mb-3"
              value={editTime}
              onChange={(e) => setEditTime(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-3">
              <button className="btn" onClick={() => setEditMode(false)}>
                Cancel
              </button>
              <button className="btn-primary btn" onClick={saveEdit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
