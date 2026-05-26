import PMSuryaGharCalculator from '@/components/calculators/PMSuryaGharCalculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PM Surya Ghar Subsidy Calculator (2026 Edition) | The Bharat Mirror',
  description: 'Calculate your exact PM Surya Ghar Muft Bijli Yojana subsidy, state bonuses, and ROI for 2026. Find out how much you can save on your electricity bill.',
};

export default function PMSuryaGharPage() {
  return (
    <div>
      <PMSuryaGharCalculator />
    </div>
  );
}
