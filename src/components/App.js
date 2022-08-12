import React, {useState, useEffect} from 'react';
import styles from '../styles/app.scss';
import {VideoSection} from "./VideoSection";
import {LikeGenerator} from "./LikeGenerator";
import MetadataService from "../services/RestService";
import SocketService from "../services/SocketService";


export const App = props => {
    const [videoMetadata, setMetadata] = useState([]);
    const [numOfVideos, setNumOfVideos] = useState(2);

    useEffect(() => {
        MetadataService.getVideoMetadata()
            .then((metadata) => {
                setMetadata(metadata);
                return metadata;
            }).then((metadata) => {
            SocketService.send_event('consume_topic', {
                rooms: metadata.slice(0, numOfVideos).map(metadata => {
                    return metadata.unique_identifier
                })
            });
        });
    }, []);

    return (
        <div className={styles.containerAll}>
            <div className={styles.videoSection}>
                <VideoSection
                    videoMetadata={videoMetadata}
                    numOfVideos={numOfVideos}
                    setNumOfVideos={setNumOfVideos}
                />
            </div>

            <div className={styles.generatorSection}>
                <LikeGenerator
                    videoMetadata={videoMetadata}
                />
            </div>

            <div className={styles.footerSection}>© 2022 Christopher Bekos. All rights reserved.</div>
        </div>
    )
};
