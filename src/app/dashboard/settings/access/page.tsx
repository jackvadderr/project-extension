import { getPendingRequestsAction } from '@/actions/systemUser/get-pending-requests-action';
import { approveRequestAction } from '@/actions/systemUser/approveRequestAction';
import { rejectRequestAction } from '@/actions/systemUser/rejectRequestAction';
import AccessControlWrapper from '@/components/dashboard/settings/AccessControlWrapper';


export default function AccessControlPage() {
  return (
    <div className="flex w-full h-full bg-gray-100 p-4 rounded-md">
      <div className="flex-1 ml-6 bg-white p-6 rounded-md shadow-sm">
        <AccessControlWrapper
          getPendingRequests={getPendingRequestsAction}
          approveRequest={approveRequestAction}
          rejectRequest={rejectRequestAction}
        />
      </div>
    </div>
  );
}