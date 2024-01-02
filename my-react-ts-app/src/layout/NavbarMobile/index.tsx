import PersonIcon from '@mui/icons-material/Person'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { useState } from 'react'
 
const index = ({ setIsClick }: { setIsClick: any }) => {
  const handleClick = () => {
    setIsClick(false)
  }

  const [isShowHover, setIsShowHover] = useState<Number |null>(null);

  const handleShowHover = (index:any) => {
    setIsShowHover(index);
  };


  return (
     <div>
      hiauvdhda
     </div>
  )
}

export default index
