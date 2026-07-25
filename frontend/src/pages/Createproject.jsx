import { Button, Col, Flex, Row } from 'antd'
import React from 'react'
import { useCreateProject } from '../hooks/apis/mutations/useCreateProject';
import { useNavigate } from 'react-router-dom';

export default function Createproject() {

    const {createProjectMutation} = useCreateProject();
    const navigate = useNavigate();

    const handleCreateProject = async () => {
        try {
            console.log("api calling")
            const response = await createProjectMutation();
            navigate(`/project/${response.data}`);
            console.log("redirect to the editor");
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
  return (
    <Row>
        <Col span={24}>
        <Flex justify='center' align='center'>
            <Button onClick={handleCreateProject}>Create Playground</Button>
        </Flex>
        </Col>
    </Row>
  )
}
