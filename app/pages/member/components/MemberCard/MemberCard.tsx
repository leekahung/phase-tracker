import { Link, useParams } from "react-router";
import useChannels from "~/hooks/useChannels";
import MemberLoadingCard from "./MemberLoadingCard";

export default function MemberCard() {
  const { memberHandle } = useParams();
  const { members, isLoading } = useChannels();
  const selectedMember = members?.find(
    (member) => member.channelHandle === memberHandle
  );

  return (
    <div className="card w-96 sm:shadow-sm sm:bg-slate-600">
      <div className="card-body">
        {isLoading ? (
          <MemberLoadingCard />
        ) : (
          <>
            <div className="flex flex-col gap-4 items-center">
              <img
                className="w-20 h-20 rounded-full"
                alt="channel icon"
                src={selectedMember?.channelImage}
              />
              <h1 className="text-2xl">{selectedMember?.channelName}</h1>
            </div>
            <table className="table">
              <tbody>
                <tr>
                  <th>Member Name (EN)</th>
                  <td className="text-center">
                    {selectedMember?.memberNameEn}
                  </td>
                </tr>
                <tr>
                  <th>Member Name (JP)</th>
                  <td className="text-center">
                    {selectedMember?.memberNameJp}
                  </td>
                </tr>
                <tr>
                  <th>Generation</th>
                  <td className="text-center">{selectedMember?.generation}</td>
                </tr>
                <tr>
                  <th>Subscribers</th>
                  <td className="text-center">
                    {selectedMember?.subscribers.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <th>Views</th>
                  <td className="text-center">
                    {selectedMember?.viewCount.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <th>Videos</th>
                  <td className="text-center">
                    {selectedMember?.videoCount.toLocaleString()}
                  </td>
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
