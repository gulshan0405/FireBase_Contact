import { Form, Formik, Field } from "formik";
import Modal from "./Modal";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup"
import { ErrorMessage } from "formik";

const contactSchemaValidation =Yup.object().shape({
name:Yup.string().required("Name is Requried"),
email:Yup.string().email("Invalid Email").required("Email is Requried"),
})


const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addConatct = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      toast.success("Contact Added Successfully");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  const updateConatct = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id);
      await updateDoc(contactRef, contact);
      toast.success("Contact Updated Successfully");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
        validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            isUpdate ? updateConatct(values, contact.id) : addConatct(values);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className=" flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name="name" className="border h-10 " />
              <div className=" text-red-500 text-xs">
                <ErrorMessage name="name"/>
              </div>
            </div>
            <div className=" flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field name="email" className="border h-10 " />
              <div className=" text-red-500 text-xs">
                <ErrorMessage name="email"/>
              </div>
            </div>
            <button className=" border bg-orange-500 px-3 py-1 self-end ">
              {isUpdate ? "update" : "add"} contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
