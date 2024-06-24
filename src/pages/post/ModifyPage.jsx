import ModifyComponent from "@components/post/ModifyComponent";
import {useParams} from "react-router-dom";

function ModifyPage() {
    const { aid } = useParams();

    return (
        <div>
            <ModifyComponent aid={aid} />
        </div>
    );
}

export default ModifyPage;