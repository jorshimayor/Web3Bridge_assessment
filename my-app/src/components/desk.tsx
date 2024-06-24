interface DeskProps {
  id: number;
  type: 'individual' | 'team';
  isBooked: boolean;
  onClick: () => void;
}

const Desk: React.FC<DeskProps> = ({ id, type, isBooked, onClick }) => {
  return (
    <div
      className={`p-4 m-2 border ${isBooked ? 'bg-red-500' : 'bg-green-500'} cursor-pointer`}
      onClick={onClick}
    >
      <h2>Desk {id}</h2>
      <p>{type === 'individual' ? 'Individual' : 'Team'} Desk</p>
    </div>
  );
};

export default Desk;
