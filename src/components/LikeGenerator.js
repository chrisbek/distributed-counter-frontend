import React, {useState, useEffect} from 'react';
import styles from '../styles/like_generator.scss';
import {GeneratorLine} from "./GeneratorLine";
import TimeService from "../services/TimeService";


const TEN_MINUTES_IN_MILLISECONDS = 1000 * 60 * 10;
export const LikeGenerator = props => {
    const [sendLikeClicked, setSendLikeClicked] = useState(false);

    TimeService.useInterval(() => {
        setSendLikeClicked(false);
    }, setSendLikeClicked ? TEN_MINUTES_IN_MILLISECONDS : null);

    return (
        <div className={styles.container}>
            <GeneratorLine
                isHeader={true}
            />
            {props.videoMetadata.map(function (video, index) {
                return (
                    <div key={"video-line-"+index} className={styles.item}>
                        <GeneratorLine
                            isHeader={false}
                            title={video.title}
                            sendRequests={sendLikeClicked}
                            videoIdentifier={video.unique_identifier}
                        />
                    </div>
                )
            })}
            <div className={getClassNameForLikeButton()} onClick={handleSendLikes}>
                {
                    sendLikeClicked ? <div>Wait</div> : <div>Send likes</div>
                }
            </div>
        </div>
    )

    function getClassNameForLikeButton() {
        return sendLikeClicked ? styles.sendLikesButton + " " + styles.waitEnabled : styles.sendLikesButton;
    }


    function handleSendLikes() {
        if (sendLikeClicked) {
            return;
        }

        setSendLikeClicked(true);
    }
};
