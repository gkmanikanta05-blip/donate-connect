import { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';

const FeedbackForm = ({ requestId }) => {
  const { submitFeedback } = useAppContext();
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    submitFeedback(requestId, feedback.trim());
    setFeedback('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 flex gap-2">
      <input
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Share feedback"
        className="flex-1 rounded-lg border border-slate-300 px-2 py-1 text-xs dark:border-slate-700 dark:bg-slate-950"
      />
      <button className="rounded-lg bg-indigo-600 px-2 py-1 text-xs font-semibold text-white">Send</button>
    </form>
  );
};

export default FeedbackForm;
