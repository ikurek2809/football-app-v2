import {FC, memo} from "react";
import {Carousel} from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Competition} from "../../domain/model/Competition";
import {competitionImages} from "../../utils/competitionImages";
import {useNavigate} from "react-router-dom";
import {paths} from "../../utils/paths";

type Props = {
    competitions: Competition[];
}

const CompetitionCarousel: FC<Props> = memo(function CompetitionCarousel(props) {
    const {competitions, navigate} = useCompetitionCarousel(props)
    return (
        <Carousel autoPlay={true} showArrows={true}>
            {competitions.map(competition => (
                <div key={competition.id} onClick={() => navigate(paths.competitionPage(competition.code))}
                     style={{padding: 20, height: 300}}>
                    <img className="image-carousel__image" alt=""
                         src={competitionImages[competition.code]}/>
                    <h1 className="legend">{competition.name}</h1>
                </div>
            ))}
        </Carousel>
    );
});

function useCompetitionCarousel(props: Props) {
    const {competitions} = props;
    const navigate = useNavigate();
    return {competitions, navigate};
}

export default CompetitionCarousel;