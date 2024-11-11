const PrevAddons = ({ items }) => {
  return (
    <div>
      {items?.map((item, idx) => {
        return (
          <div key={idx} className="bg-gray-50 rounded-lg shadow-lg overflow-hidden mb-4">
            <div className="px-4 py-2 bg-blue-600">
              <div className="font-bold text-2xl text-white">{item?.date}</div>
            </div>
            {item?.addonsData?.map((addon, addonIdx) => {
              return (
                <div key={addonIdx} className="px-6 py-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-semibold text-lg">Item</span>
                    <span className="text-gray-900 font-bold text-lg">{addon?.itemName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-semibold text-lg">Price</span>
                    <span className="text-gray-900 font-bold text-lg">{addon?.itemPrice} /-</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700 font-semibold text-lg">Total</span>
                    <span className="text-gray-900 font-bold text-lg">{addon?.total} /-</span>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default PrevAddons;
