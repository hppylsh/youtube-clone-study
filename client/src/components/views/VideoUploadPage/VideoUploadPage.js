import React from "react";
import {Typography, Button, Form, message, Input, Icon} from "antd";
import TextArea from "antd/lib/input/TextArea";
import Title from "antd/es/typography/Title";

function VideoUploadPage() {
    return (
        <div style={{maxWidth: '700px', margin: '2rem auto'}}>
            <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>

                    </div>
                </div>
                <br/>
                <br/>
                <label>Title</label>
                <Input></Input>
                <br/>
                <br/>
                <label>Description</label>
                <TextArea></TextArea>
                <br/>
                <br/>

                <select>
                    <option></option>
                </select>
                <select>
                    <option></option>
                </select>

                <Button type={"primary"} size={"large"}> Submit</Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage