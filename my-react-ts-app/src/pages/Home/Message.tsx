import { format } from 'timeago.js';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

const Message = ({ item,message }: { item: any;message:string}) => {
  const authState = useSelector((state: RootState) => state.auth);
  // console.log(item);
  // console.log(authState.user?.user.id);
  
  let bgColor = parseInt(authState.user?.user.id)  === parseInt(item.send_id )  ? 'bg-sky-600':'bg-yellow-600'
  let justify= parseInt(authState.user?.user.id)  === parseInt(item.send_id )  ? 'justify-end':'justify-start'
  
  return (
    <div className={`w-full flex h-auto ${justify} items-center my-2`}>
      <div className={`rounded-full px-7 py-2 ml-2 flex flex-col flex-wrap ${bgColor}`}>
        <span className="font-Pacifico font-bold text-white w-auto">{item.content ?item.content:message }</span>
        <span className="font-thin font-Pacifico">{format(item.timestap ?item.timestap : new Date() )}</span>
      </div>
    </div>
  );
};

export default Message;
