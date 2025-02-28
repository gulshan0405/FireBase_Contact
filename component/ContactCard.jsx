import { db } from "../config/firebase"
import { deleteDoc,doc } from "firebase/firestore"
import AddAndUpdateContact from "./AddAndUpdateContact"
import useDisclouse from "../hooks/useDisclouse"
import { toast } from "react-toastify";

const ContactCard = ({contact}) => {
  const{isOpen,onClose,onOpen}=useDisclouse();
  const deleteContact=async(id)=>{
try {
  await deleteDoc(doc(db,"contacts",id))
  toast.success("Contact Deleted Successfully");
} catch (error) {
  console.log(error);
  
}
  }
  return (
    <>
    <div key={contact.id} className="flex bg-[#FFEAAE] gap-2 mt-2 rounded-lg p-2 items-center justify-between">
    <div>
      <img src="/images/proPic.png" alt="" />
    </div>
    
    <div className="flex-grow">
      <h1 className="font-bold text-xl">{contact.name}</h1>
      <p>{contact.email}</p>
    </div>
    <div className="flex size-[32px] ml-auto mr-9 gap-1">
      <img onClick={onOpen} src="/images/edit.png" alt="Edit" className="cursor-pointer" />
      <img onClick={()=>deleteContact(contact.id)} src="/images/delete.png" alt="Delete" className="cursor-pointer" />
    </div>
  </div>
  <AddAndUpdateContact isUpdate contact={contact} isOpen={isOpen} onClose={onClose}/>
    </>
  )
}

export default ContactCard