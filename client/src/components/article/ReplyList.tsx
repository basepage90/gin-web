import styled from 'styled-components';
import {RootState} from "store/store";

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import SmsIcon from '@material-ui/icons/Sms';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Popover from '@material-ui/core/Popover';
import { myAvartar } from 'statics/images'
import { useSelector } from 'react-redux';

const ReplyWrapper = styled.div`
    height: 100%;
    width: 100%;
    font-size: 14px;
    color: #202022;
`;

const StUl = styled.ul`
    padding: 0;
    margin-bottom: 0;
`;

const StLi = styled.li`
    list-style: none;
    border-bottom: 1px solid #DDDFE4;
`;

const StLiChild = styled.li`
    list-style: none;
    border-bottom: 1px solid #DDDFE4;
`;

const Reply = styled.div`
    display: flex;
    flex-direction: row;
    padding: 16px;
    background-color: #FFFFFF;
`;


const AvatarBox = styled.div`
    flex: 0 0 56px;
`;

const AvatarBoxChild = styled.div`
    flex: 0 0 46px;
`;  

const MainBox = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
`;

const NameBox = styled.div`
    & .reply__deleteBtn {
        float: right;
        color: ${({theme}) => theme.palette.gray6};
    }
`;

const Name = styled.span`
    font-weight: bold;
    margin-right: 8px;

`;

const RegDate = styled.span`
    color: ${({theme}) => theme.palette.gray6};
`;

const RemovePop = styled.div`
    display:flex;
    width: 200px;
    height: 32px;
    border: 3px solid ${({theme}) => theme.palette.sky0} ;

    & .pop__password {
        flex: 1 1 auto;
        width: 50%;
        outline: none;
        border: 0;
        border-right: 3px solid ${({theme}) => theme.palette.sky0};
        font-size: 14px;
    }

    & button {
        flex: 1 1 auto;
        color: #FFFFFF;
        border: 1px solid ${({theme}) => theme.palette.sky0};
        background: ${({theme}) => theme.palette.sky1};
        font-size: 14px;
    }

`;


const ContentsBox = styled.div`
    .reply__sibling {
        font-weight: 600;
        color: ${({theme}) => theme.palette.sky0};
    }
    
    & p {
        white-space:pre-wrap;
    }
`;

const BtnBox = styled.div`
    display: inline-block;

    & .MuiIconButton-root:hover {
        background-color: inherit;
    }

    & .reply__replyBtn {
        padding: 0;
        color: ${({theme}) => theme.palette.gray6};
    }

    & .MuiSvgIcon-root {
        margin-right: 8px;
    }

    & .IconBtn__text {
        font-size: 14px;
        color: ${({theme}) => theme.palette.gray6};
    }
`;

interface ReplyListProps {
    replyList: {
        id: number;
        depth: number;
        admin_flag: boolean;
        blind: boolean;
        name: string;
        reg_date: string;
        contents: string;
        group_no: number;
        sibling_name: string;
        e: () => void;
    }[];
    open: boolean;
    anchorEl: any;
    openReply: boolean;
    ReplyChild: any;
    RenderReplyChild: Function;
    handleClick: (e: any, id: number) => void;
    handleClose: () => void;
    ShowReplyChild: (id: number) => void;
    doRemoveReply: () => void;
}

const ReplyList = ({replyList,open,anchorEl,openReply,ReplyChild,RenderReplyChild,handleClick,handleClose,ShowReplyChild,doRemoveReply}: ReplyListProps) => {
    const admin_flag = useSelector( (state:RootState) => state.user.admin_flag);

    return (
        <ReplyWrapper className="ReplyWrapper">
            <StUl>
                {replyList.map( reply => {
                    return (
                        reply.depth === 0 ?
                        <StLi key={reply.id} >
                            <Reply >
                                <AvatarBox>
                                {reply.admin_flag ?
                                    <Avatar src={myAvartar} />
                                :
                                    <Avatar >
                                    {reply.blind ? "" : reply.name.substr(0,1).toUpperCase()}
                                    </Avatar>
                                }
                                </AvatarBox>
                                <MainBox>
                                    <NameBox>
                                        <Name>
                                            {reply.blind ? <span style={{textDecoration:'line-through'}}>unknown</span>
                                            :
                                            reply.name
                                            }
                                        </Name>
                                        <RegDate>
                                            {reply.reg_date}
                                        </RegDate>
                                        {!reply.blind &&
                                        <>
                                        <IconButton className="reply__deleteBtn" size="small" onClick={(e) => handleClick(e,reply.id)}>
                                            <HighlightOffIcon fontSize="small"/>
                                        </IconButton>
                                        </>
                                        }
                                    </NameBox>
                                    <ContentsBox>
                                        <p>
                                            {reply.blind ? "삭제 된 댓글입니다." : reply.contents}
                                        </p>
                                    </ContentsBox>
                                    <BtnBox>
                                    {!reply.blind &&
                                        <IconButton className="reply__replyBtn" size="small" onClick={(e) => {ShowReplyChild(reply.id)}} >
                                            <SmsIcon fontSize="small"/>
                                                <span className="IconBtn__text">
                                                    답글
                                                </span>
                                        </IconButton>
                                    }
                                    </BtnBox>
                                </MainBox>
                            </Reply>
                            {openReply && RenderReplyChild(reply.id,reply.group_no)}
                        </StLi>
                        :
                        <StLiChild key={reply.id} >
                            <ReplyChild >
                                <AvatarBoxChild>
                                {reply.admin_flag ?
                                    <Avatar src={myAvartar} />
                                :
                                    <Avatar style={{width: '30px', height: '30px'}}>
                                        {reply.name.substr(0,1).toUpperCase()}
                                        
                                    </Avatar>
                                }
                                </AvatarBoxChild>
                                <MainBox>
                                    <NameBox>
                                        <Name>
                                            {reply.name}
                                        </Name>
                                        <RegDate>
                                            {reply.reg_date}
                                        </RegDate>
                                        {reply.admin_flag ?
                                            admin_flag ?
                                            <IconButton className="reply__deleteBtn" size="small" onClick={(e) => handleClick(e,reply.id)}>
                                                <HighlightOffIcon fontSize="small"/>
                                            </IconButton>
                                            :
                                            null
                                        :
                                        <IconButton className="reply__deleteBtn" size="small" onClick={(e) => handleClick(e,reply.id)}>
                                            <HighlightOffIcon fontSize="small"/>
                                        </IconButton>
                                        }
                                    </NameBox>
                                    <ContentsBox>
                                        <p>
                                            <span className="reply__sibling" >{reply.sibling_name}</span>
                                            {reply.sibling_name && <span>&nbsp;</span>}
                                            {reply.contents}
                                        </p>
                                    </ContentsBox>
                                    <BtnBox >
                                        <IconButton className="reply__replyBtn" size="small" onClick={() => {ShowReplyChild(reply.id)}}  >
                                            <SmsIcon fontSize="small" />
                                            <span className="IconBtn__text" >
                                                답글
                                            </span>
                                        </IconButton>
                                    </BtnBox>
                                </MainBox>
                            </ReplyChild>
                            {openReply && RenderReplyChild(reply.id,reply.group_no,reply.name)}
                        </StLiChild>
                    );
                })}
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                <RemovePop>
                    <input id="pop__password" className="pop__password" type="password" placeholder="비밀번호"/>
                    <button onClick={() => doRemoveReply()}>확인</button>
                </RemovePop>
                </Popover>
            </StUl>
        </ReplyWrapper>
    )
}

export default ReplyList;