import Divider from '~/layouts/components/Divider';
import TransitionLayout from '~/layouts/TransitionLayout';
import AboutSection from '~/pages/about/components/AboutSection';

export function meta() {
  return [{ title: 'About' }, { name: 'description', content: 'About section' }];
}

export default function about() {
  return (
    <TransitionLayout>
      <div className="flex flex-col items-center gap-4">
        <AboutSection title="Purpose">
          <p>
            Phase Connect Tracker (aka "Phase Tracker") is an unofficial fan site developed to
            follow the latest YouTube subscription data from active members affiliated with the
            VTuber organization Phase Connect.
          </p>
        </AboutSection>
        <Divider />
        <AboutSection title="Affiliation">
          <p>
            This fan site is not affiliated with Phase Connect or any of its members nor is it
            affiliated with any other projects/fan sites that tracks VTuber subscription numbers.
          </p>
        </AboutSection>
        <Divider />
        <AboutSection title="Collection">
          <p>
            "Phase Tracker" currently collects data gather from YouTube's Data API for active Phase
            Connect VTubers at a daily basis or whenever changes are made for deployment. The
            tracked data include their subscription count, view count, video count, channel profile
            image, and channel name. Data from non-active member (e.g. "graduated"/"retired") are
            not being tracked.
          </p>
          <p>
            It currently stores historical data related to subscription and view count starting from
            Feb. 23, 2025.
          </p>
        </AboutSection>
      </div>
    </TransitionLayout>
  );
}
