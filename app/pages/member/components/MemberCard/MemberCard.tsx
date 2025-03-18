import { useParams } from 'react-router';
import useChannels from '~/hooks/useChannels';
import MemberLoadingCard from './MemberLoadingCard';
import formatChangeNumbers from '~/utils/numberHelpers';
import Avatar from '~/components/global/Avatar';
import ExternalLink from '~/components/global/ExternalLink';

interface Props {
  dailyChange: Record<string, number>;
}

export default function MemberCard({ dailyChange }: Props) {
  const { memberHandle } = useParams();
  const { members, isLoading } = useChannels();
  const selectedMember = members?.find((member) => member.channelHandle === memberHandle);

  return (
    <div className="sm:card w-[375px] sm:w-[25rem] sm:bg-slate-600 sm:shadow-sm">
      <div className="sm:card-body">
        {isLoading ? (
          <MemberLoadingCard />
        ) : (
          <>
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-20 w-20 rounded-full" src={selectedMember?.channelImage} />
              <h1 className="text-2xl">{selectedMember?.channelName}</h1>
            </div>
            <table className="table">
              <tbody className="table-fixed text-center">
                <tr>
                  <th>Name (EN)</th>
                  <td>{selectedMember?.memberNameEn}</td>
                </tr>
                <tr>
                  <th>Name (JP)</th>
                  <td>{selectedMember?.memberNameJp}</td>
                </tr>
                <tr>
                  <th>Generation</th>
                  <td>{selectedMember?.generation}</td>
                </tr>
                <tr>
                  <th>Subscribers</th>
                  <td>
                    <div className="flex flex-wrap justify-center gap-2">
                      <span>{selectedMember?.subscribers.toLocaleString()}</span>
                      <span>({formatChangeNumbers(dailyChange.subs)})</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>Views</th>
                  <td>
                    <div className="flex flex-wrap justify-center gap-2">
                      <span>{selectedMember?.viewCount.toLocaleString()}</span>
                      <span>({formatChangeNumbers(dailyChange.views)})</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>Videos</th>
                  <td>{selectedMember?.videoCount.toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Link to Channel</th>
                  <td>
                    <ExternalLink to={`https://www.youtube.com/${selectedMember?.channelHandle}`}>
                      Link
                    </ExternalLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}
