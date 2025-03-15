interface ReminderCardProps {
    title: string;
    description: string;
}
  
const ReminderCard = ({ title, description }: ReminderCardProps) => {
    return (
        <div className="p-4 bg-gray-100 rounded-lg border">
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
        </div>
    );
};
  
  export default ReminderCard;
