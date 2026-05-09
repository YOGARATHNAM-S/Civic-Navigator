import { db } from './src/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const samples = [
  {
    title: "Property Tax Rebate 2026",
    content: "BBMP has announced a 5% rebate for citizens paying their property tax in full before April 30th. Payments can be made via the BBMP online portal using SAS 2026-27.",
    category: "tax",
    keywords: ["bbmp", "property tax", "rebate"]
  },
  {
    title: "BESCOM Solar Incentive",
    content: "Citizens installing rooftop solar panels are eligible for a subsidy up to 40% under the PM-Surya Ghar scheme. Apply through the BESCOM official portal.",
    category: "electricity",
    keywords: ["bescom", "solar", "subsidy"]
  },
  {
    title: "BWSSB Kaveri Stage V",
    content: "Kaveri Stage V water connections are now being extended to 110 villages around Bengaluru. Residents must submit occupancy certificates and tax receipts to apply.",
    category: "water",
    keywords: ["bwssb", "water", "kaveri"]
  }
];

async function seed() {
  console.log("Seeding knowledge base...");
  for (const s of samples) {
    await addDoc(collection(db, 'knowledge_base'), s);
  }
  console.log("Seeding complete.");
}

// Note: In a real app, this would be a separate script or admin tool.
// For now, I've defined it as a reference.
export default seed;
