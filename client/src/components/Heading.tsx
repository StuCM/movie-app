interface HeadingProps {
    search: string;

}

const Heading = ({ search }: HeadingProps) => {
    return (
        <div className="heading">
            <h1>Movies</h1>
        </div>
    )
};

export default Heading;