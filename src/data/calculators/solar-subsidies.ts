export interface StateSubsidyRule {
  state: string;
  extraPerKW: number;
  maxSubsidy: number;
}

export const STATE_SUBSIDIES: StateSubsidyRule[] = [
  { state: "Andaman and Nicobar Islands", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Andhra Pradesh", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Arunachal Pradesh", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Assam", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Bihar", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Chandigarh", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Chhattisgarh", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Dadra and Nagar Haveli and Daman and Diu", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Delhi", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Goa", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Gujarat", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Haryana", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Himachal Pradesh", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Jammu and Kashmir", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Jharkhand", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Karnataka", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Kerala", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Ladakh", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Lakshadweep", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Madhya Pradesh", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Maharashtra", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Manipur", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Meghalaya", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Mizoram", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Nagaland", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Odisha", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Puducherry", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Punjab", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Rajasthan", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Sikkim", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Tamil Nadu", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Telangana", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Tripura", extraPerKW: 0, maxSubsidy: 0 },
  { state: "Uttar Pradesh", extraPerKW: 15000, maxSubsidy: 30000 },
  { state: "Uttarakhand", extraPerKW: 0, maxSubsidy: 0 },
  { state: "West Bengal", extraPerKW: 0, maxSubsidy: 0 },
];
