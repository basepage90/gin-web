import { openPublisher } from "store/store";
import { useDispatch } from "react-redux";
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PublishIcon from '@material-ui/icons/Publish';

const Div = styled.div` 
    position: absolute;
    height: 50px;
    top: 0;
    left: 80%;
    right: 0;
    z-index: 10;

    ${({theme}) => theme.media.xsmall}{
        position: relative;
        height: 30px;
        left: 0;
        right: 0;
    }
`;

const InDiv = styled.div`
    position: relative;
    top: 10px;
    display: flex;
    justify-content: space-around;
`;

const Button1 = styled(Button)`
    flex: 0 0 30%;
    background-color: ${({theme}) => theme.palette.hotpink1};
    &:hover {
        background-color: ${({theme}) => theme.palette.hotpink0};
    }
`;

const Button2 = styled(Button)`
    flex: 0 0 30%;
    background-color: ${({theme}) => theme.palette.sky1};
    &:hover {
        background-color: ${({theme}) => theme.palette.sky0};
    }
`;

const ExitAndPublish = ({history}) => {
    const dispatch = useDispatch({});

    const exit = () => {
        history.goBack();
    }

    const open = () => {
        dispatch(openPublisher());
    };

    return (
        <Div>
            <InDiv>
                <Button1
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<KeyboardBackspaceIcon />}
                    onClick={exit}
                >
                    Exit
                </Button1>
                <Button2
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<PublishIcon />}
                    onClick={open}
                >
                    Publish
                </Button2>
            </InDiv>
        </Div>
    )
};

export default ExitAndPublish;