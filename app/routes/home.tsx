import { useState } from 'react';
import useChannels from '~/hooks/useChannels';
import SubscriberTable from '~/pages/home/components/SubscriberTable/SubscriberTable';
import LineSkeleton from '~/components/animation/LineSkeleton';
import FilterIconSVG from '~/components/icons/FilterIconSVG';
import TransitionLayout from '~/layouts/TransitionLayout';

export function meta() {
  return [
    { title: 'Phase Connect Tracker' },
    { name: 'description', content: 'Welcome to Phase Connect Tracker!' },
  ];
}

export default function home() {
  const { members, isLoading, isError } = useChannels();
  const [search, setSearch] = useState('');

  const filteredMembers = members?.filter((member) => {
    const searchTerm = search.toLowerCase();
    return (
      member.memberNameEn.toLowerCase().includes(searchTerm) ||
      member.memberNameJp.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <TransitionLayout>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-semibold">Phase Connect</h1>
        <h2 className="text-xl italic">
          Live YouTube subscriber rankings for Phase Connect talents
        </h2>
        {isError ? (
          <>
            <em>Unable to fetch</em>
            <span>No data loaded...</span>
          </>
        ) : (
          <>
            <div className="flex gap-2">
              <span>
                Last daily update:{' '}
                {members !== undefined && new Date(members[0].updatedAt).toLocaleDateString()}
              </span>
              {isLoading && <LineSkeleton />}
            </div>
            <div>
              <label className="input rounded-3xl outline-none!">
                <FilterIconSVG />
                <input
                  type="search"
                  required
                  defaultValue={search}
                  placeholder="Find talent by name"
                  onChange={(event) => {
                    setSearch(event.target.value);
                  }}
                />
                {search && (
                  <span>
                    {filteredMembers?.length === 0
                      ? 'No results'
                      : `Showing ${filteredMembers?.length} of ${members?.length}`}
                  </span>
                )}
              </label>
            </div>
            <SubscriberTable members={filteredMembers} isLoading={isLoading} />
          </>
        )}
      </div>
    </TransitionLayout>
  );
}
