const banks = [
  { name: "Maybank", color: "#FFC72C" },
  { name: "CIMB", color: "#EC1C24" },
  { name: "Public Bank", color: "#003087" },
  { name: "RHB", color: "#0066B3" },
  { name: "Hong Leong", color: "#003366" },
  { name: "AmBank", color: "#00A651" },
];

export default function BankLogos() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 mb-8">Compare rates from Malaysia&apos;s leading banks</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center">
          {banks.map((bank) => (
            <div
              key={bank.name}
              className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-center">
                <div
                  className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: bank.color }}
                >
                  {bank.name.charAt(0)}
                </div>
                <span className="text-sm font-medium text-gray-700">{bank.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
