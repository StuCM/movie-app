import { useSelector } from "react-redux";
import { RootState } from "../store";



const Heading = () => {
    const search = useSelector((state: RootState) => state.search);
    return (
        <div className="heading">
            <h1>{search.value !== '' ? `Movie Search - ${search.value}` : "Top Rated Movies"}</h1>
        </div>
    )
};

export default Heading;