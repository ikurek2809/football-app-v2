import {FC, memo} from "react";
import coverImage from "../../assets/images/cover-image.jpg"

type Props = Record<string, never>;

const Subheader: FC<Props> = memo(function Subheader() {

    return (
        <div className="subheader">
            <div className="subheader__image-area">
                <img
                    className="subheader__image"
                    src={coverImage}
                    alt=""
                />
            </div>
        </div>
    );
});

export default Subheader;
