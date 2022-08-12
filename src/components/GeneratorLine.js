import React, {useState, useEffect} from 'react';
import styles from '../styles/generator_line.scss';
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import RestService from "../services/RestService";


const ONE_MINUTE_IN_MILLISECONDS = 60 * 1000;
export const GeneratorLine = props => {
    const randomAddition = Math.floor(Math.random() * 20);
    const [valuesPerMinute, setValuesPerMinute] = useState(
        [10,20,30,40,50,11,21,31,41,51].map(x => x + randomAddition)
    );

    useEffect(() => {
        if (props.sendRequests) {
            for (let i = 0; i < valuesPerMinute.length; i++) {
                setTimeout(() => {
                        sendAsyncRequests(
                            props.videoIdentifier, valuesPerMinute[i]
                        ).then((response) => {
                            console.info('requests sent');
                        });
                    },
                    i * ONE_MINUTE_IN_MILLISECONDS
                );
            }


        }
    }, [props.sendRequests]);

    if (props.isHeader) {
        return (
            <div className={styles.container + " " + styles.header}>
                <div className={styles.titleContainer}>Video title</div>
                <div className={styles.oneMinContainer}>Number of likes sent per 1 minute</div>
                <div className={styles.fiveMinContainer}>Cumulatively likes per 5 minutes</div>
                <div className={styles.tenMinContainer}>Cumulatively likes per 10 minutes</div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer + " " + styles.videoTitle}>{props.title}</div>
            <div className={styles.oneMinContainer}>
                {valuesPerMinute.map((value, index) => {
                    return (
                        <div key={"1m-"+index} className={styles.oneMinItem}>
                            <EditText
                                showEditButton={false}
                                defaultValue={value.toString()}
                                inputClassName={styles.editableItem}
                                onSave={(e) => handleSave(e, index)}
                            />
                        </div>
                    );
                })}
            </div>
            <div className={styles.fiveMinContainer}>
                {getCumulativeLikesPerFiveMinutes(valuesPerMinute).map((value, index) => {
                    return (
                        <div key={"5m-"+index} className={styles.fiveMinItem}>
                            {value}
                        </div>
                    );
                })}
            </div>
            <div className={styles.tenMinContainer}>
                <div className={styles.tenMinItem}>
                    {valuesPerMinute.reduce((a,b)=>a+b)}
                </div>
            </div>
        </div>
    )

    function getCumulativeLikesPerFiveMinutes() {
        let results = [];
        let tmpResult = 0;
        for (let i = 0; i < valuesPerMinute.length; i++) {
            if ((i + 1) % 5 === 0) {
                results.push(tmpResult + valuesPerMinute[i]);
                tmpResult = 0;
                continue;
            }

            tmpResult += valuesPerMinute[i];
        }

        return results
    }

    function handleSave(e, index) {
        setValuesPerMinute((prevValues) => {
            let items = [...prevValues];
            items[index] = parseInt(e.value);

            return items;
        })
    }

    async function sendAsyncRequests(videoIdentifier, numberOfRequests) {
        await RestService.sendRequestForVideoLikes(videoIdentifier, numberOfRequests);
    }
};
