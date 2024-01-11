import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toggleOpen } from "../store/modalReducer";
import { useEffect, useRef } from "react";


const Modal: React.FC = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.modal.isOpen);
    const modalRef = useRef<HTMLDialogElement>(null);

    const handleClose = () => {
        dispatch(toggleOpen());
    };

    useEffect(() => {
        const modalElement = modalRef.current;
        if (modalElement) {
            if (isOpen) {
                modalElement.showModal();
            } else {
                modalElement.close();
            }   
        } 
    },[isOpen]);

    return (
        <dialog ref={modalRef} className="modal">
            <div className="modal-content">
                <div className="modal-image">
                    <img src="" alt="" />
                </div>
                <div className="modal-info">
                    <h1>Movie Title</h1>
                    <p>Year</p>
                    <p>Synopsis</p>
                </div>
                <button onClick={handleClose}>X</button>
            </div>            
        </dialog>
    );
}

export default Modal;