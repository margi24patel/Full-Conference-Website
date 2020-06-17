import ImageToggleOnScroll from "./ImageToggleOnScroll";

const SpeakerDetail = ({
  id,
  firstName,
  lastName,
  bio,
  favorite,
  onHeartFavoriteHandler,
}) => {
  // console.log(`SpeakerDetail:${id} ${firstName} ${lastName} ${favorite}`);
  return (
    <div className="card col-4 cardmin">
      <ImageToggleOnScroll
        className="card-img-top"
        primaryImg={`/static/speakers/bw/Speaker-${id}.jpg`}
        secondaryImg={`/static/speakers/Speaker-${id}.jpg`}
        alt="{firstName} {lastName}"
      />
      <div className="card-body">
        <h4 className="card-title">
          {/* heartButton */}
          <button
            className={favorite ? "heartredbutton" : "heartdarkbutton"}
            onClick={(e) => {
              onHeartFavoriteHandler(e, !favorite);
            }}
            data-sessionid={id}
          />
          <span>
            {firstName} {lastName}
          </span>
        </h4>
        <span>{bio}</span>
      </div>
    </div>
  );
};

export default SpeakerDetail;
