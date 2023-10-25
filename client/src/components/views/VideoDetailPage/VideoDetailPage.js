import React, {useEffect, useState} from 'react';
import {List, Avatar, Row, Col} from 'antd';
import Axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscribe from "./Sections/Subscribe";

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId;

    const videoVariable = {
        videoId: videoId
    }

    const [VideoDetail, setVideoDetail] = useState([]);

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', videoVariable)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.videoDetail)
                    setVideoDetail(response.data.videoDetail)
                } else {
                    alert('Failed to get video Info')
                }
            })
    }, []);

    if (VideoDetail.writer) {
        return (
            <Row>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{width: '100%', padding: '3rem 4em'}}>
                        <video style={{width: '100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`}
                               controls></video>

                        <List.Item
                            actions={[/*<LikeDislikes video videoId={videoId} userId={localStorage.getItem('userId')}/>,*/
                                <Subscribe userTo={VideoDetail.writer._id}
                                           userFrom={localStorage.getItem('userId')}/>]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer && VideoDetail.writer.image}/>}
                                title={<a href="https://ant.design">{VideoDetail.title}</a>}
                                description={VideoDetail.description}
                            />
                            <div></div>
                        </List.Item>

                        {/*<Comments CommentLists={CommentLists} postId={Video._id} refreshFunction={updateComment}/>*/}

                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo/>
                </Col>
            </Row>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default VideoDetailPage;