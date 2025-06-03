import ContactMessagesWrapper from './ContactMessagesWrapper';
import { listAllContactMessageAction } from '@/actions/contactMessage/list-all-contact-message-action';


export default function ContactMessagesPage() {
  return (
    <div className="flex w-full h-full bg-gray-100 p-4 rounded-md">
      <div className="flex-1 ml-6 bg-white p-6 rounded-md shadow-sm">
        <ContactMessagesWrapper getAllMessages={listAllContactMessageAction} />
      </div>
    </div>
  );
}
