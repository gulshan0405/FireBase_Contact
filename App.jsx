import NavBar from "./component/NavBar"
import { IoIosSearch } from "react-icons/io";
import { FaCirclePlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import {collection, onSnapshot} from 'firebase/firestore'
import { ToastContainer, toast } from 'react-toastify';
import { db } from "./config/firebase"
import ContactCard from "./component/ContactCard";
import AddAndUpdateContact from "./component/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import NotFoundContact from "./component/NotFoundContact";


const App = () => {
  const [contact,setContact]=useState([]);
 const {isOpen,onOpen,onClose}=useDisclouse();
 

  useEffect(()=>{
    const getContacts=async ()=>{
try {
  const contactsRef= collection (db,"contacts");
  onSnapshot(contactsRef,(snapshot)=>{
    const contactLists=snapshot.docs.map((doc)=>{ return {
      id:doc.id,
      ...doc.data()
    }  });
    setContact(contactLists);
    return contactLists;
  })
} catch (error) {
  console.log(error);
}
    };
    getContacts();
  },[])

  const filterContacts=(e)=>{
         const value =e.target.value;
         const contactsRef= collection (db,"contacts");
  onSnapshot(contactsRef,(snapshot)=>{
    const contactLists=snapshot.docs.map((doc)=>{ return {
      id:doc.id,
      ...doc.data()
    }  });
     
    const filteredContacts= contactLists.filter(contact =>
       contact.name.toLowerCase().includes(value.toLowerCase())
  );
    setContact(filteredContacts);
    return contactLists;
  })
  }
  return (
    <>
    <div className="max-w-[390px] mx-auto px-4">
   <NavBar/>
   <div className="flex gap-2">
   <div className="flex relative text-center" >
    <IoIosSearch className="text-white text-3xl absolute  mt-1 ml-1"/>
    <input onChange={filterContacts} type="text"  placeholder="Search Contact" className="bg-transparent flex-grow min-w-[300px]  border border-white text-white pl-9 rounded-md h-10"/>
   </div>
    <FaCirclePlus onClick={onOpen} className="text-4xl text-white cursor-pointer"/>
   </div>
   <div>
    {
     contact.length <=0 ? <NotFoundContact/> : contact.map((contact)=>(
      <ContactCard key={contact.id} contact={contact} />
      ))
    }
   </div>
   </div>
   <AddAndUpdateContact isOpen={isOpen} onClose={onClose} />
   <ToastContainer position="bottom-center"/>
    </>
   
  )
}

export default App