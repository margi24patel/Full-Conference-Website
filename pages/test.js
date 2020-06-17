import React from "react";
import ImageToggleOnScroll from "../src/ImageToggleOnScroll";
import SpeakerData from "../src/SpeakerData";

const test = ({ id }) => {
  // console.log(`SpeakerDe`)
  return (
    <>
      {/* <h1>test</h1> */}
      <div>
        {[1124, 187, 823, 1269, 1530].map((speakerId) => {
          return (
            <div key={speakerId}>
              <ImageToggleOnScroll
                primaryImg={`/static/speakers/bw/Speaker-${speakerId}.jpg`}
                secondaryImg={`/static/speakers/Speaker-${speakerId}.jpg`}
                alt="{firstName} {lastName}"
              />
              {firstName}
            </div>
          );
        })}
      </div>
    </>
  );
};
export default test;
