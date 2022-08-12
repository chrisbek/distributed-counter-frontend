import axios from "axios";


const BACKEND_URL = 'http://localhost:3000/dev';
class RestService {
    async getVideoMetadata() {
        try {
            const response = await axios.get(BACKEND_URL + '/videos/metadata');
            return response.data;
        } catch (e) {
            console.error(e.message);
        }
    }

    async sendRequestForVideoLikes(videoIdentifier, numberOfRequests) {
        let requests = [];
        for (let i = 0; i < numberOfRequests; i++) {
            requests.push(
                axios({
                    method: 'post',
                    url: BACKEND_URL + '/videos/' + videoIdentifier +'/likes',
                    data: {}
                })
            )
        }

        axios
            .all(requests)
            .then(axios.spread((...responses) => {
                responses.forEach(res => console.log('Success'));
            }))
            .catch(error => {
                console.error(error);
            })
    }
}

export default new RestService();