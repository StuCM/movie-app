import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toggleOpen } from "../store/modalReducer";
import { useEffect, useRef } from "react";


const Modal: React.FC = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.modal.isOpen);
    const modalRef = useRef<HTMLDialogElement>(null);
    const movie = useSelector((state: RootState) => state.movieList.selectedMovie);
    console.log(movie);

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
                    <img src={movie?.Poster} alt={movie?.Title} />
                </div>
                <div className="modal-info">
                    <h1>{movie?.Title}</h1>
                    <p>{movie?.Year}</p>
                    <p>Synopsis</p>
                </div>
                <button onClick={handleClose}>X</button>
            </div>            
        </dialog>
    );
}

export default Modal;