import Image from "next/image";

// Ordered by market share
const banks = [
  { name: "Maybank", logo: "/bank-logos/maybank.png" },
  { name: "Public Bank", logo: "/bank-logos/public-bank.png" },
  { name: "CIMB", logo: "/bank-logos/cimb.png" },
  { name: "RHB", logo: "/bank-logos/rhb.png" },
  { name: "Hong Leong", logo: "/bank-logos/hong-leong.png" },
  { name: "AmBank", logo: "/bank-logos/ambank.png" },
  { name: "OCBC", logo: "/bank-logos/ocbc.png" },
  { name: "UOB", logo: "/bank-logos/uob.png" },
  { name: "HSBC", logo: "/bank-logos/hsbc.png" },
  { name: "Standard Chartered", logo: "/bank-logos/standard-chartered.png" },
  { name: "Bank Islam", logo: "/bank-logos/bank-islam.png" },
];

export default function BankLogos() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 mb-8">
          Compare rates from Malaysia&apos;s leading banks
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 justify-items-center">
          {banks.map((bank) => (
            <div
              key={bank.name}
              className="flex items-center justify-center w-full bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-[0_1px_3px_rgba(0,0,0,0.05)] hover:scale-[1.02] hover:shadow-md transition-all duration-200"
            >
              <Image
                src={bank.logo}
                alt={`${bank.name} logo`}
                width={120}
                height={36}
                className="object-contain max-h-[36px] w-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
