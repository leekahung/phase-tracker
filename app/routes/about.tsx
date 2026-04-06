import Divider from '~/layouts/components/Divider';
import TransitionLayout from '~/layouts/TransitionLayout';
import AboutSection from '~/pages/about/components/AboutSection';

export function meta() {
  return [{ title: 'About' }, { name: 'description', content: 'About section' }];
}

export default function about() {
  return (
    <TransitionLayout>
      <div className="m-auto flex w-[95%] max-w-3xl flex-col items-center gap-4">
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
            This fan site is not affiliated with Phase Connect, any of its members, or other fan
            sites that track VTuber subscription numbers.
          </p>
        </AboutSection>
        <Divider />
        <AboutSection title="Collection">
          <p>
            Data is collected from YouTube's Data API on a daily basis or whenever updates are
            deployed. Tracked data includes subscription count, view count, video count, channel
            profile image, and channel name. Historical data is stored starting from Feb. 23, 2025.
          </p>
          <p>
            For newer members, tracking begins from their debut date or whenever they're added to
            the database.
          </p>
        </AboutSection>
      </div>
    </TransitionLayout>
  );
}
