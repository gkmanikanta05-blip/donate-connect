import RecipientRequestsTable from '../../components/recipient/RecipientRequestsTable';
import RequestEssentialsForm from '../../components/recipient/RequestEssentialsForm';
import FeedbackForm from '../../components/recipient/FeedbackForm';
import EmptyState from '../../components/common/EmptyState';
import StatusBadge from '../../components/common/StatusBadge';
import { useAppContext } from '../../hooks/useAppContext';

const RequestsPage = () => {
  const { currentUser, requests, updateRequestStatus } = useAppContext();

  if (currentUser.role === 'Recipient') {
    const mine = requests.filter((item) => item.recipientId === currentUser.id);

    return (
      <div className="space-y-6">
        <RequestEssentialsForm />
        <RecipientRequestsTable requests={mine} />
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
          <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Delivery Feedback</h3>
          {!mine.length ? (
            <EmptyState title="No requests" text="Feedback form appears once requests are available." />
          ) : (
            <div className="grid gap-3">
              {mine.map((req) => (
                <div key={req.id} className="rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-700">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{req.item}</p>
                    <StatusBadge status={req.status} />
                  </div>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">Current feedback: {req.feedback || 'None'}</p>
                  {req.status === 'Delivered' && <FeedbackForm requestId={req.id} />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (currentUser.role === 'Logistics Coordinator') {
    const assignable = requests.filter((item) => item.status !== 'Delivered');

    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Update Request Delivery Status</h3>
        {!assignable.length ? (
          <EmptyState title="No active requests" text="All requests are completed." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-slate-500 dark:text-slate-300">
                  <th className="py-2">Recipient</th>
                  <th>Item</th>
                  <th>Status</th>
                  <th>Update</th>
                </tr>
              </thead>
              <tbody>
                {assignable.map((req) => (
                  <tr key={req.id} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="py-2">{req.recipientName}</td>
                    <td>{req.item}</td>
                    <td><StatusBadge status={req.status} /></td>
                    <td className="flex gap-2 py-2">
                      <button onClick={() => updateRequestStatus(req.id, 'Approved')} className="rounded bg-blue-600 px-2 py-1 text-xs text-white">Approve</button>
                      <button onClick={() => updateRequestStatus(req.id, 'In Transit')} className="rounded bg-violet-600 px-2 py-1 text-xs text-white">Transit</button>
                      <button onClick={() => updateRequestStatus(req.id, 'Delivered')} className="rounded bg-emerald-600 px-2 py-1 text-xs text-white">Delivered</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }

  return <EmptyState title="No request access" text="This role does not manage requests from this page." />;
};

export default RequestsPage;
