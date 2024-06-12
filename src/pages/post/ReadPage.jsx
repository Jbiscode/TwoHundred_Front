import ReadComponent from "@components/post/ReadComponent.jsx";
import { useParams } from "react-router-dom";

function ReadPage() {
    const { aid } = useParams();
    console.log("aid:", aid);

    return (
        <div>
            <ReadComponent aid={aid} />
        </div>
    );
}

export default ReadPage;