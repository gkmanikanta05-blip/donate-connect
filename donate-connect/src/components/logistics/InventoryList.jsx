import EmptyState from '../common/EmptyState';

const InventoryList = ({ inventory }) => {
  if (!inventory.length) return <EmptyState title="No inventory" text="Inventory will appear here." />;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
      <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Inventory List</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-slate-500 dark:text-slate-300">
              <th className="py-2">Item</th>
              <th>Quantity</th>
              <th>Warehouse</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id} className="border-t border-slate-100 dark:border-slate-800">
                <td className="py-2">{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.warehouse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryList;
