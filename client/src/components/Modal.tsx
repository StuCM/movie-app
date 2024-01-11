import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toggleOpen } from "../store/modalReducer";
import { useEffect, useRef } from "react";


const Modal: React.FC = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.modal.isOpen);
    const modalRef = useRef<HTMLDialogElement>(null);
    const movie = useSelector((state: RootState) => state.movieList.selectedMovie);

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
                    <img src={movie?.poster_path} alt={movie?.title} />
                </div>
                <div className="modal-info">
                    <h2>{movie?.title}</h2>
                    <h3>Release Date: <span className="release-date">{movie?.release_date}</span></h3>
                    <h3>About</h3>
                    <p>{movie?.overview}</p>
                </div>
                <button onClick={handleClose}>&times;</button>
            </div>            
        </dialog>
    );
}

export default Modal;