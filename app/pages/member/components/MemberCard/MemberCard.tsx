import { Link, useParams } from 'react-router';
import useChannels from '~/hooks/useChannels';
import MemberLoadingCard from './MemberLoadingCard';
import formatChangeNumbers from '~/utils/numberHelpers';

interface Props {
  dailyChange: Record<string, number>;
}

export default function MemberCard({ dailyChange }: Props) {
  const { memberHandle } = useParams();
  const { members, isLoading } = useChannels();
  const selectedMember = members?.find((member) => member.channelHandle === memberHandle);

  return (
    <div className="card w-96 sm:bg-slate-600 sm:shadow-sm">
      <div className="card-body">
        {isLoading ? (
          <MemberLoadingCard />
        ) : (
          <>
            <div className="flex flex-col items-center gap-4">
              <img
                className="h-20 w-20 rounded-full"
                alt="channel icon"
                src={selectedMember?.channelImage}
              />
              <h1 className="text-2xl">{selectedMember?.channelName}</h1>
            </div>
            <table className="table">
              <tbody>
                <tr>
                  <th>Member Name (EN)</th>
                  <td className="text-center">{selectedMember?.memberNameEn}</td>
                </tr>
                <tr>
                  <th>Member Name (JP)</th>
                  <td className="text-center">{selectedMember?.memberNameJp}</td>
                </tr>
                <tr>
                  <th>Generation</th>
                  <td className="text-center">{selectedMember?.generation}</td>
                </tr>
                <tr>
                  <th>Subscribers</th>
                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <span>{selectedMember?.subscribers.toLocaleString()}</span>
                      <span>({formatChangeNumbers(dailyChange.subs)})</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>Views</th>
                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <span>{selectedMember?.viewCount.toLocaleString()}</span>
                      <span>({formatChangeNumbers(dailyChange.views)})</span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>Videos</th>
                  <td className="text-center">{selectedMember?.videoCount.toLocaleString()}</td>
                </tr>
                <tr>
                  <th>Link to Channel</th>
                  <td className="text-center">
                    <Link
                      to={`https://www.youtube.com/${selectedMember?.channelHandle}`}
                      className="underline"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Link
                    </Link>
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
