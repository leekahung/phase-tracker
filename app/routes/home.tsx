import useChannels from '~/hooks/useChannels';
import SubscriberTable from '~/pages/home/components/SubscriberTable/SubscriberTable';
import LineSkeleton from '~/components/animation/LineSkeleton';
import FilterIconSVG from '~/components/icons/FilterIconSVG';
import { useState } from 'react';

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
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl">Phase Connect</h1>
      <h2 className="text-xl">YouTube Subscription Count</h2>
      {isError ? (
        <>
          <em>Unable to fetch</em>
          <span>No data loaded...</span>
        </>
      ) : (
        <>
          <div className="flex gap-2">
            <em>
              Last updated:{' '}
              {members !== undefined && new Date(members[0].updatedAt).toLocaleDateString()}
            </em>
            {isLoading && <LineSkeleton />}
          </div>
          <div>
            <label className="input rounded-3xl outline-none!">
              <FilterIconSVG />
              <input
                type="search"
                required
                defaultValue={search}
                placeholder="Filter by name"
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
              />
            </label>
          </div>
          <SubscriberTable members={filteredMembers} isLoading={isLoading} />
        </>
      )}
    </div>
  );
}
