export const OrdersContent = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold mb-4">Захиалгууд</h2>
    <div className="border rounded-xl bg-white overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Захиалагч</th>
            <th className="p-3">Төлөв</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-3">#101</td>
            <td className="p-3">Ганхуяг</td>
            <td className="p-3 text-green-500 font-medium">Хүргэгдсэн</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);
