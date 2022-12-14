import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Board} from "../../domain/Board";
import {request} from "../../api";
import {Button, Card, Modal, Row} from "react-bootstrap";
import CommentList from "../board-comment/CommentList";

const BoardView = () => {

    const params = useParams();
    const id = Number(params.id);
    const Navigate = useNavigate();
    // Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [board, setBoard] = useState<Board>({
        title: '',
        content: '',
    });

    const getBoard = useCallback(async () => {
        const res = await request('get', `/api/board/${id}`);
        setBoard(res);
    }, [params])

    const handleDelete = async () => {
        await request('delete', `/api/board?id=${id}`);
        setShow(false);
        Navigate('/');
    }

    useEffect(() => {
        getBoard();
    },[])

    return (
        <>
            <Row className="justify-content-end">
                <Button variant="info" onClick={() => {
                    Navigate(`/board-edit/${params.id}`)
                }}>수정</Button>
                <Button variant="danger" onClick={() => handleShow()}>삭제</Button>
            </Row>
            <Card className="p-3 my-3">
                <Card.Title className="pb-2" style={{borderBottom: '1px solid #dddddd'}}>{board?.title}</Card.Title>
                <Card.Text>
                    {board?.content}
                </Card.Text>
            </Card>

            <Row className="justify-content-center">
                <CommentList board_id={id}></CommentList>
                <Button variant="primary" onClick={() => Navigate(-1)}>돌아가기</Button>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>삭제</Modal.Title>
                </Modal.Header>
                <Modal.Body>삭제하시겠습니까?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default BoardView;
