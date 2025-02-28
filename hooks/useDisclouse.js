
import { useState } from "react";
const useDisclouse = () => {
     const [isOpen,setISOpen]=useState(false);
        
          const onOpen=()=>{
            setISOpen(true);
          };
         
          const onClose=()=>{
             setISOpen(false);
          };
      
  return {onClose,onOpen,isOpen};
}

export default useDisclouse