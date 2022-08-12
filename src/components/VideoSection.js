import React, {useState, useEffect} from 'react';
import styles from '../styles/video_section.scss';
import SocketService from "../services/SocketService";
import {AddIcon} from "./svg/AddIcon";
import {SubstractIcon} from "./svg/SubstractIcon";
import {LikeIcon} from "./svg/Like";


export const VideoSection = props => {
    const [liveCountAggregationsPerMinute, setAggregationsPerMinute] = useState({});
    const [liveCountAggregationsPerFiveMinutes, setAggregationsPerFiveMinutes] = useState({});
    const [liveCountAggregationsPerTenMinutes, setAggregationsPerTenMinutes] = useState({});

    useEffect(() => {
        SocketService.add_error_handler_listener();
        SocketService.add_connection_handler();
        SocketService.add_handler("live_aggregations_1", (payload) => {
            setAggregationsPerMinute(prevLiveCountAggregations => (
                {...prevLiveCountAggregations, [payload.id]: payload.count})
            );
        });
        SocketService.add_handler("live_aggregations_5", (payload) => {
            setAggregationsPerFiveMinutes(prevLiveCountAggregations => (
                {...prevLiveCountAggregations, [payload.id]: payload.count})
            );
        });
        SocketService.add_handler("live_aggregations_10", (payload) => {
            setAggregationsPerTenMinutes(prevLiveCountAggregations => (
                {...prevLiveCountAggregations, [payload.id]: payload.count})
            );
        });

        SocketService.emit('consume_1_min_aggregations', {});
        SocketService.emit('consume_5_min_aggregations', {});
        SocketService.emit('consume_10_min_aggregations', {});

        return () => {
            SocketService.remove_listeners();
        }
    }, []);

    useEffect(() => {
        let videoIdentifiers = props.videoMetadata.slice(0, props.numOfVideos).map(function (video) {
            return (video.unique_identifier);
        });
        SocketService.register_to_rooms(videoIdentifiers);
    }, [props.videoMetadata, props.numOfVideos]);

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.infoText}>Total videos: {props.videoMetadata.length}</div>
                <div className={styles.infoText}>Videos shown: {props.numOfVideos}</div>
                <AddIcon className={styles.icon} onClick={increaseNumOfVideosShown}/>
                <SubstractIcon className={styles.icon} onClick={decreaseNumOfVideosShown}/>
            </div>
            <div className={styles.videoContainer}>
                {props.videoMetadata.slice(0, props.numOfVideos).map(function (video, index) {
                    return (
                        <div className={styles.video} key={video.unique_identifier}>
                            <img src={require('../resources/images/video.png')} className={styles.videoImage}/>
                            <div className={styles.videoTitle}>{video.title}</div>
                            <div className={styles.likesCounterContainer}>
                                <div className={styles.lastMinLikes}>
                                    <div>Last 1'
                                        likes: {getLastMinuteLikesForVideoIdentifier(video.unique_identifier)}</div>
                                    <LikeIcon className={styles.like}/>
                                </div>
                                <div className={styles.lastMinLikes}>
                                    <div>Last 5'
                                        likes: {getLastFiveMinutesLikesForVideoIdentifier(video.unique_identifier)}</div>
                                    <LikeIcon className={styles.like}/>
                                </div>
                                <div className={styles.lastMinLikes}>
                                    <div>Last 10'
                                        likes: {getLastTenMinutesLikesForVideoIdentifier(video.unique_identifier)}</div>
                                    <LikeIcon className={styles.like}/>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )

    function getLastMinuteLikesForVideoIdentifier(video_identifier) {
        return liveCountAggregationsPerMinute[video_identifier] ? liveCountAggregationsPerMinute[video_identifier] : "?";
    }

    function getLastFiveMinutesLikesForVideoIdentifier(video_identifier) {
        return liveCountAggregationsPerFiveMinutes[video_identifier] ? liveCountAggregationsPerFiveMinutes[video_identifier] : "?";
    }

    function getLastTenMinutesLikesForVideoIdentifier(video_identifier) {
        return liveCountAggregationsPerTenMinutes[video_identifier] ? liveCountAggregationsPerTenMinutes[video_identifier] : "?";
    }

    function increaseNumOfVideosShown() {
        if (props.numOfVideos < props.videoMetadata.length) {
            props.setNumOfVideos((prevNumOfVideos) => (
                prevNumOfVideos + 1
            ));
        }
    }

    function decreaseNumOfVideosShown() {
        if (props.numOfVideos > 1) {
            props.setNumOfVideos((prevNumOfVideos) => (
                prevNumOfVideos - 1
            ));
        }
    }
};
