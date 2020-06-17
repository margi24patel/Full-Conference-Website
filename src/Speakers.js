import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../static/site.css";
import { Header } from "../src/Header";
import { Menu } from "../src/Menu";
import SpeakerData from "./SpeakerData";
import SpeakerDetail from "./SpeakerDetail";

const Speakers = ({}) => {
  const [speakerList, setSpeakerList] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const [speakingSaturday, setSpeakingSaturday] = useState(true);
  const [speakingSunday, setSpeakingSunday] = useState(true);

  useEffect(() => {
    //setLoading(true);
    new Promise(function(resolve) {
      setTimeout(function() {
        resolve();
      }, 1000);
    }).then(() => {
      setLoading(false);
      const speakerListServerFilter = SpeakerData.filter((sat, sun) => {
        return (speakingSunday && sun) || (speakingSaturday && sat);
      });
      setSpeakerList(speakerListServerFilter);
    });
    return () => {
      console.log("cleanUp");
    };
  }, []);

  const speakerListFiltered = isLoading
    ? []
    : speakerList
        .filter(
          ({ sat, sun }) => (speakingSaturday && sat) || (speakingSunday && sun)
        )
        .sort(function(a, b) {
          if (a.firstName < b.firstName) {
            return -1;
          }
          if (a.firstName > b.firstName) {
            return 1;
          }
          return 0;
        });

  const handleChangeSaturday = () => {
    setSpeakingSaturday(!speakingSaturday);
  };

  const handleChangeSunday = () => {
    setSpeakingSunday(!speakingSunday);
  };

  const heartFavoriteHandler = (e, favoriteValue) => {
    e.preventDefault();
    const sessionId = parseInt(e.target.attributes["data-sessionid"].value);
    console.log("sessionID ", sessionId);
    setSpeakerList(
      speakerList.map((item) => {
        if (item.id === sessionId) {
          item.favorite = favoriteValue;
          return item;
        }
        return item;
      })
    );
    console.log("changing session favorte to " + favoriteValue);
  };

  if (isLoading) return <div>Loading...</div>;

  //console.log(SpeakerData)
  console.log(SpeakerData);

  return (
    <div>
      <Header />
      <Menu />
      <div className="container">
        <div className="btn-toolbar  margintopbottom5 checkbox-bigger">
          <div className="hide">
            <div className="form-check-inline">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={handleChangeSaturday}
                  checked={speakingSaturday}
                />
                Saturday Speakers
              </label>
            </div>
          </div>
          <div className="hide">
            <div className="form-check-inline">
              <label className="form-check-label">
                <input
                  type="checkbox"
                  className="form-check-input"
                  onChange={handleChangeSunday}
                  checked={speakingSunday}
                />
                Sunday Speakers
              </label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="card-deck">
            {speakerListFiltered.map(
              ({ id, firstName, lastName, bio, favorite }) => {
                return (
                  <SpeakerDetail
                    key={id}
                    id={id}
                    firstName={firstName}
                    lastName={lastName}
                    bio={bio}
                    favorite={favorite}
                    onHeartFavoriteHandler={heartFavoriteHandler}
                  />
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speakers;
